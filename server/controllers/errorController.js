import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  // const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const value = err.keyValue.title;
  // console.log(err.keyValue.name);
  const message = `Duplicate field value: '${value}'. Each user can only write one review for one film. Sorry dude!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join("| ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again!", 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    // API error
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
  }
  // frontend error
  console.log("ERROR 🤡", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // api
  if (req.originalUrl.startsWith("/api/")) {
    // Operational, trusted error: send msg to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // Programming or other unknown error: don't leak error details
    }
    // 1) log error
    console.error("ERROR👻 from prod", err);
    // 2) send a generic msg
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
  // frontend errors
  if (err.isOperational) {
    // console.log(err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  // 1) log error
  console.error("ERROR👻 from prod", err);
  // 2) send a generic msg

  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

export default (err, req, res, next) => {
  // console.log(err.stack);
  // because errors come from mongoose, so there is no statusCode

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }
    console.log(err);
    // console.log('Error msg:', err.message);
    // console.log('Error msg:', error.message);
    sendErrorProd(error, req, res);
  }
};
