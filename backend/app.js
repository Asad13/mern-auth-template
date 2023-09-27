import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import headers from './middlewares/response-headers.js';
import rateLimiter from './middlewares/rate-limiter.js';
import errorHandler from './middlewares/errtor-handler.js';
import userRouter from './routes/user.js';
import { verifyUser } from './middlewares/auth.js';

const createApp = () => {
  const app = express();
  app.use(headers());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));
  app.use(cookieParser());

  app.use('/api', rateLimiter()); // Apply the rate limiting to API calls only
  app.use('/api/users', userRouter);
  app.use('/api', verifyUser()); // Apply the authentication middleware to API calls only

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
  ) {
    // In Production
    const appRootDir = path.resolve(); // root directory

    // Declaring Static Folder to serve static resources
    app.use(
      '/assets',
      express.static(path.join(appRootDir, 'frontend', 'dist', 'assets'))
    );

    // Serves Frontend
    app.get('*', (req, res) => {
      res.sendFile(path.join(appRootDir, 'frontend', 'dist', 'index.html'));
    });
  } else {
    // In Development
    app.get('/', (req, res) => {
      res
        .status(200)
        .json({ status: true, message: 'Everything is Working...' });
    });
  }

  // 404 Middleware
  app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

  // Custom Error Handler
  app.use(errorHandler());

  return app;
};

export default createApp;
