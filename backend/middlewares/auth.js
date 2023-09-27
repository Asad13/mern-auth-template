import express from 'express';
import { verifyToken } from '../utils/auth-tokens.js';

/**
 * Verifies that the Token with user's request is valid or not
 * @function
 * @name verifyToken
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const verifyUser = () => async (req, res, next) => {
  try {
    const { cookies } = req;
    const token = cookies?.token;

    if (!token) {
      throw new Error('Access denied');
    }

    const decoded = verifyToken(token.trim());

    if (decoded instanceof Error) throw decoded;

    req.user = {
      id: decoded.sub,
    };
    next();
  } catch (err) {
    const error = new Error('Access denied');
    res.status(401);
    next(error);
  }
};
