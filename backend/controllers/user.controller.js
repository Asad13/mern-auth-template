import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import lodash from 'lodash';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../services/user.service.js';
import { handleAuthTokens } from '../utils/auth.js';
import {
  createTokenCookie,
  deleteTokenCookie,
} from '../utils/create-cookies.js';

/**
 * Register a new User - user - Public - POST - /api/users/register
 * @function
 * @name registerUser
 * @param {express.Request} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const userData = lodash.pick(req.body, ['name', 'email', 'password']);

  const isUserExist = await findUserByEmail(userData.email);

  if (isUserExist != null) {
    res.status(400);
    throw new Error(`User already exists`);
  }

  const user = await createUser(userData);

  if (user instanceof Error || user == null) {
    res.status(500);
    throw new Error(`Error in creating account`);
  }

  res.status(201).json({
    status: true,
    message: 'Registered successfully',
  }); // redirects to login page in frontend
});

/**
 * Authenticate User - user - Public - POST - /api/users/auth
 * @function
 * @name authUser
 * @param {express.Request} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
export const authUser = expressAsyncHandler(async (req, res, next) => {
  const userData = lodash.pick(req.body, ['email', 'password']);

  const user = await findUserByEmail(userData.email);

  if (user == null) {
    res.status(401);
    throw new Error(`Invalid email or password`);
  } else if (user instanceof Error) {
    res.status(500);
    throw new Error(`Error in finding account`);
  }

  // check password
  const isValidUser = await user.comparePassword(userData.password);
  if (!isValidUser) {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }

  const token = await handleAuthTokens(user._id);

  if (token == null) {
    res.status(500);
    throw new Error(`Something went wrong`);
  }

  // set http only cookie
  res.cookie(createTokenCookie(token));

  res.status(200).json({
    status: true,
    message: 'Logged in successfully',
    data: {
      user: user.toJSON(),
    },
  });
});

/**
 * Logout User - user - Private - POST - /api/users/logout
 * @function
 * @name logoutUser
 * @param {express.Request} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
export const logoutUser = expressAsyncHandler(async (req, res, next) => {
  res.cookie(deleteTokenCookie());
  res.status(200).json({ status: true, message: 'Logged out successfully' });
});

/**
 * Get User Profile - user - Private - GET - /api/users/profile
 * @function
 * @name getUserProfile
 * @param {express.Request & {id: string, email: string}} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
export const getUserProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await findUserById(req.user.id);

  if (user == null || user instanceof Error) {
    res.status(400);
    throw new Error(user?.message ?? `Internal server error`);
  }

  res.status(200).json({
    status: true,
    message: 'User profile',
    data: { user: user.toJSON() },
  });
});

/**
 * Update User Profile - user - Private - PUT - /api/users/profile
 * @function
 * @name updateUserProfile
 * @param {express.Request & {id: string, email: string}} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
export const updateUserProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await updateUser(req.user.id, req.body);

  if (user == null || user instanceof Error) {
    res.status(400);
    throw new Error(user?.message ?? `Internal server error`);
  }

  res.status(200).json({
    status: true,
    message: 'Successfully updated user profile',
    data: { user: user.toJSON() },
  });
});
