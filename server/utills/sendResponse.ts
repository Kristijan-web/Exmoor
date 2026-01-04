import { HydratedDocument } from "mongoose";
import { Response } from "express";

function sendResponse<T>(
  res: Response,
  data: HydratedDocument<T> | HydratedDocument<T>[],
  statusCode: number
) {
  res.status(statusCode).json({
    message: "success",
    data,
  });
}

export default sendResponse;
