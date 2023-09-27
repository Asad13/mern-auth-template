import { generateToken } from './auth-tokens.js';

/**
 * Generates new Auth Token
 * @function
 * @name handleAuthTokens
 * @param {string} id - User ID
 * @returns {(string | null)} generated token or null
 */
export const handleAuthTokens = async (id) => {
  try {
    const payload = { sub: id };
    const token = generateToken(payload);

    return token;
  } catch (error) {
    return null;
  }
};
