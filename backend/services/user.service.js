import mongoose from 'mongoose';
import User from '../models/user.model.js';

/**
 * User
 * @typedef {Object} User
 * @property {string} name - Name of the User.
 * @property {string} email - Email of the User.
 * @property {string} password - Password of the User.
 */

/**
 * Creates a new User  in the database
 * @function
 * @name createUser
 * @param {User} userData - User Object
 */
export const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    return error;
  }
};

/**
 * Finds User by Email
 * @function
 * @name createUser
 * @param {string} email - User's Email Address
 */
export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return error;
  }
};

/**
 * Finds User by Id
 * @function
 * @name findUserById
 * @param {string} id - User's ID
 */
export const findUserById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return error;
  }
};

/**
 * Update User
 * @function
 * @name updateUser
 * @param {string} id - User's ID
 * @param {object} updatedUserData - User's Updated Data Object
 */
export const updateUser = async (id, updatedUserData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }

    const user = await User.findById(id);

    if (updatedUserData?.name) {
      user.name = updatedUserData.name;
    }

    if (updatedUserData?.email) {
      user.email = updatedUserData.email;
    }

    if (updatedUserData?.password) {
      user.password = updatedUserData.password;
    }

    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    return error;
  }
};
