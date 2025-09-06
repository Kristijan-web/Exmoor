import { NextFunction, Request, Response } from "express";

// Sta je problem?
// - Error objekat na sebi nema property-e objekta AppError
// Sta ja zelim?
// - Da sendProduction uspesno salje poruku kada je AppError greska i kada nije (Error)
// Zasto samo ne stavim da sendProduction ocekuje parametar tipa AppError?
// -

interface AppErrorType extends Error {
  isOperational: boolean;
  statusCode: number;
  status: string;
}

function sendProduction(error: AppErrorType | Error, res: Response) {
  // Od cega ts pokusava da me zastiti?

  if ("IsOperational" in error) {
    res.status(error.statusCode).send({
      status: error.status,
      message: error.message,
      isOperational: true,
    });
  } else {
    res.status(500).send({
      status: "fail",
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

const globalErrorMiddleware = function (
  error: AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    sendDevelopment(error, res);
  } else {
    // dozvolim da se prosledi i Error | AppError ako je podatak tipa Error onda ga castujem u AppError i dodam property-e
    sendProduction(error, res);
  }
};

export default globalErrorMiddleware;
