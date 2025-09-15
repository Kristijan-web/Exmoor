import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import catchAsync from "../utills/catchAsync";
import AppError from "../utills/appError";
import sendResponse from "../utills/sendResponse";

const filterUserBody = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
  };
  next();
};

// Napravi restrictTo middleware da odredjuje ko sme da pristupi endpoint-u

const getUsers = getAll(User);

const getUser = getOne(User);

const createUser = createOne(User);

const deleteUser = deleteOne(User);

const updateUser = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  // ne zaboravi da uradis filtraciju req.body, moze se poslati role: 'admin'
  const updatedDocument = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDocument) {
    return next(new AppError(`User does not exist`, 404));
  }
  sendResponse(res, updatedDocument);
});

const getMe = function (req: Request, res: Response, next: NextFunction) {
  // korisnikovi podaci su u req.user
  const plain = req.user.toObject(); // ili .toJSON()
  delete plain._id;
  delete plain.password;

  res.status(200).json({
    message: "success",
    data: plain,
  });
};

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  filterUserBody,
  getMe,
};
