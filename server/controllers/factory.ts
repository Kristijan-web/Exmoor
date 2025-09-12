import { HydratedDocument, Model } from "mongoose";
import catchAsync from "../utills/catchAsync";
import { Response } from "express";
import AppError from "../utills/appError";
import sendResponse from "../utills/sendResponse";

const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.find();
    sendResponse(res, documents);
  });

const getOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError("Resource does not exist", 404));
    }
    sendResponse(res, document);
  });

const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    // ne zaboravi da filtriras body jer neko moze da uradi user: "admin"
    const newDocument = await Model.create(req.body);

    sendResponse(res, newDocument);
  });

// ovo je za admina
const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedDocument = await Model.findByIdAndDelete(id);

    if (!deletedDocument) {
      return next(new AppError("Specified element does not exist", 404));
    }

    // trebalo bi vrati statusCode 204 i message: 'success', umesto da se salje ceo user document
    res.status(204).json({
      message: "success",
    });
  });

const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req, res, next) => {
    console.log("evo me u catchAsync");
    const { id } = req.params;

    // ne zaboravi da uradis filtraciju req.body, moze se poslati role: 'admin'
    const updatedDocument = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDocument) {
      return next(new AppError("Specified element does not exist", 404));
    }
    sendResponse(res, updatedDocument);
  });

export { getAll, getOne, createOne, deleteOne, updateOne };
