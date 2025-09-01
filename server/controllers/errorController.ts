import { NextFunction, Request, Response } from "express";

function sendProduction() {}

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
  sendDevelopment(error, res);
};

export default globalErrorMiddleware;
