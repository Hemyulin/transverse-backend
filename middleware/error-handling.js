class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (!res.headersSent) {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.isOperational ? err.message : "Internal server error.";

    res.status(statusCode).json({ status, message });

    if (status === "error") {
      console.error("Error details:", req.method, req.path, err);
    }
  }
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "path not found" });
};

module.exports = { errorHandler, notFoundHandler, AppError };
