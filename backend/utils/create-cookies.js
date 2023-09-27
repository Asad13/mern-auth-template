import { serialize } from 'cookie';

/**
 * Creates new httpOnly cookie for Auth Token
 * @function
 * @name createTokenCookie
 * @param {string} token
 * @returns {string} A serialized httpOnly cookie
 */
export const createTokenCookie = (token) => {
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: parseInt(process.env.TOKEN_MAX_AGE),
    path: '/',
  });

  return cookie;
};

/**
 * Deletes the httpOnly cookie for Auth Token
 * @function
 * @name deleteTokenCookie
 * @returns {string} A serialized httpOnly cookie with null value
 */
export const deleteTokenCookie = () => {
  const cookie = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  return cookie;
};
