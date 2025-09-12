import { HydratedDocument } from "mongoose";
import { Response } from "express";

function sendResponse<T>(
  res: Response,
  data: HydratedDocument<T> | HydratedDocument<T>[]
) {
  res.status(200).json({
    message: "success",
    data,
  });
}

export default sendResponse;
