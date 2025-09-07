import { NextFunction, Request, Response } from "express";
import AppError from "../utills/appError";

// interface AppErrorType extends Error {
//   isOperational?: boolean;
//   statusCode: number;
//   status: string;
// }

// Sta ja uopste zelim?
// - Da uradim type safety za sendProduction, error u send production moze biti ili AppError ili Error,
// Da li smatram da sam uradio type safety ako samo stavim error: AppErrorType?
// - Donekle, resice problem, ali nije istina da ce error uvek biti AppErrorType, takodje moze biti i Error

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
  console.log("Evo ga error objekat", error);

  res.status(500).send({
    message: error.message,
    stack: error.stack,
  });
}

// Sta sve moze da stigne kao tip podatka u error?
// - Moze da stigne AppErrorType ili obicni Error
// Sta ja zelim?
// - Da u sendProduction pravilno uradim logiku ako je error tipa AppErrorType
// Sta je problem?
// - Problem je taj sto lazem ts, govorim da ce svakie error biti tipa AppErrorType a moze stici i Error objekat

const globalErrorMiddleware = function (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    sendDevelopment(error, res);
  } else {
    let err = error;

    sendProduction(err, res);
  }
};

export default globalErrorMiddleware;
