import { NextFunction, Request, Response } from "express";

function sendProduction(error: Error, res: Response) {
  // if(error.isOperational) {
  //   res.status(error.statusCode).send({
  //     status: error.status
  //     message: error.message,
  //     isOperationa: true
  //   })
  // }
}

function sendDevelopment(error: Error, res: Response) {
  console.log("Evo ga error objekat", error);

  res.status(500).send({
    message: error.message,
    stack: error.stack,
  });
}

const globalErrorMiddleware = function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    sendDevelopment(error, res);
  } else {
    sendProduction(error, res);
  }
};

export default globalErrorMiddleware;
