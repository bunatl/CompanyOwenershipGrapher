//if no previous route corresponds - not found error
const notFound = ((req, res, next) => {
  const error = new Error(`Not found - ${ req.originalUrl }`);
  res.status(404);

  //passing to the next middleware - this time error handler
  next(error);
});

//error handler
const errorHandler = ((error, req, res, next) => {
  //check if the error is comming from (un)known route, set status code accordingly
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
});

module.exports = {
  notFound,
  errorHandler
};