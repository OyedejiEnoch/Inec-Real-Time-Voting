
export default (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

     if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    return res.status(404).json({
      success: false,
      message: message,
      stack: err.stack,
    });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    return res.status(400).json({
      success: false,
      message: message,
    });
  }
     if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exist`;
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

    if (err.name === "JsonwebTokenError") {
    const message = "Json web token is invalid. Try again";
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  // handling expired jwt error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired. Try again";
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}