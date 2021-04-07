const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

const urlNotFound = (req, res, next) => {
  const error = new Error(`Url - ${req.originalUrl} Not found`);
  next(error);
};

export { urlNotFound, errorHandler };
