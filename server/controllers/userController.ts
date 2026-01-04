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
  // currentPassword
  req.body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    address: req.body.address,
    postalCode: req.body.postalCode,
    // polje se korsiti samo kada se radi update korisnikove sifre
    currentPassword: req.body.currentPassword,
  };

  // zabranjuje da korisnik posalje novu sifru preko endpoint-a za promenu ostalih informacija
  // Problem sa metodom ispod je sta ako gadja /api/v1/users/updatePassword

  if (req.method === "PATCH" && req.originalUrl === "/api/v1/users") {
    req.body.password = undefined;
  }

  if (
    req.method === "PATCH" &&
    req.originalUrl === "/api/v1/users/updatePassword"
  ) {
    /// KAKO JE BRE currentPassword undefiend
    req.body = {
      currentPassword: req.body.currentPassword,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
  }

  next();
};

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
    return next(new AppError(`Korisnik ne postoji`, 404));
  }
  sendResponse(res, updatedDocument, 200);
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
