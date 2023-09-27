import jwt from 'jsonwebtoken';

/**
 * JWT Payload
 * @typedef {Object} Payload
 * @property {string} sub - ID of the User.
 */

/**
 * Generates new Auth Token
 * @function
 * @name generateToken
 * @param {Payload} payload
 * @returns {string} generated token
 */
export const generateToken = function (payload) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
  });

  return token;
};

/**
 * Verify and Decode Token
 * @function
 * @name verifyToken
 * @param {string} token
 * @returns {Payload | Error} the decoded value(object) of the token or Error
 */
export const verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    return decoded;
  } catch (err) {
    const error = new Error('Access denied');

    return error;
  }
};
