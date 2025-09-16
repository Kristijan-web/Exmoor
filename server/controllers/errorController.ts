import { NextFunction, Request, Response } from "express";
import AppError from "../utills/appError";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";

function handleInvalidId() {
  return new AppError("Provided id is invalid", 400);
}

function handleDuplicateKey(err: MongoServerError) {
  let uniqueField;

  for (const prop in err.keyValue) {
    uniqueField = prop;
  }

  return new AppError(`${uniqueField} already exists`, 400);
}

function handleValidationError(err: mongoose.Error.ValidationError) {
  // Sta moze da pukne za validaciju?
  // - sifre se ne pokpalaju
  // - polje koje je required nje prosledjeno
  let firstError = Object.values(err.errors)[0];
  return new AppError(`${firstError.message}`, 400);
}
function sendProduction(error: AppError | Error, res: Response) {
  if (error instanceof AppError && error.isOperational) {
    res.status(error.statusCode).send({
      status: error.status,
      message: error.message,
      isOperational: true,
    });
  } else {
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
}

function sendDevelopment(error: Error, res: Response) {
  res.status(500).send({
    message: error.message,
    error,
    stack: error.stack,
  });
}

const globalErrorMiddleware = function (
  error: AppError | Error | MongoServerError | mongoose.Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("evo greske", error);
  if (process.env.NODE_ENV === "development") {
    sendDevelopment(error, res);
  } else {
    let err = error;

    if (err.name === "CastError") {
      err = handleInvalidId();
    }

    if (
      err instanceof mongoose.Error.ValidationError &&
      err.name === "ValidationError"
    ) {
      err = handleValidationError(err);
    }

    if (err instanceof MongoServerError && err.code === 11000) {
      err = handleDuplicateKey(err);
    }

    sendProduction(err, res);
  }
};

export default globalErrorMiddleware;
