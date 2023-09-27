import rateLimit from 'express-rate-limit';

const rateLimiter = (
  minutes = 15,
  max = 100,
  message = 'Too many requests from this IP'
) => {
  message += `, please try again after ${minutes} minutes`;

  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max,
    message,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  });
};

export default rateLimiter;
