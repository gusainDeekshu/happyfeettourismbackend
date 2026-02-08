//server\middleware\errmiddleware.js

const errorHandler = (err, req, res, next) => {
  // Use the status code set in the controller, otherwise default to 500 (Server Error)
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // Only show stack trace in development mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };