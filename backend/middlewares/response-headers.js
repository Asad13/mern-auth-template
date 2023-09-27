import express from 'express';

/**
 * Sets Response Headers
 * @function
 * @name headers
 * @param {express.Request} req - Express Request Object
 * @param {express.Response} res - Express Response Object
 * @param {express.NextFunction} next - Express NextFunction
 */
const headers = () => (req, res, next) => {
  const origin = req.headers.origin;
  if (origin !== undefined) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // console.log(`origin: ${req.headers.origin}`);
  // console.log(`host: ${req.headers.host}`);
  // console.log(`host name: ${req.hostname}`);
  // console.log(`url: ${req.url}`);
  // console.log(`base url: ${req.baseUrl}`);
  // console.log(`path: ${req.path}`);
  // console.log(`original url: ${req.originalUrl}`);

  next();
};

export default headers;
