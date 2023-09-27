const errorHandler = () => (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development' && err?.stack) {
    console.log(err?.stack);
  } else {
    console.log(err?.message);
  }

  if (res.headersSent) {
    next(err);
  }

  let statusCode = res?.statusCode ? res.statusCode : 500;
  let message = err?.message ? err.message : 'Internal Server Error';

  // mongoose error handling
  if (err?.name === 'CastError' && err?.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource Not Found';
  }

  res.status(statusCode).json({
    status: false,
    message,
  });
};

export default errorHandler;
