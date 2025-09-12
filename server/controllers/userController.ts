import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import catchAsync from "../utills/catchAsync";
import AppError from "../utills/appError";
import sendMail from "../helpers/sendMail";
import sendResponse from "../utills/sendResponse";

const filterBody = function (req: Request, res: Response, next: NextFunction) {
  console.log("evo me u filter body");
  req.body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
  };
  console.log("evo me nakon req.body");
  next();
};

// Napravi restrictTo middleware da odredjuje ko sme da pristupi endpoint-u

const getUsers = getAll(User);

const getUser = getOne(User);

const createUser = createOne(User);

const deleteUser = deleteOne(User);

const updateUser = updateOne(User);

const getMe = function (req: Request, res: Response, next: NextFunction) {
  // korisnikovi podaci su u req.user
  req.user.password = undefined as any;
  req.user._id = undefined;

  res.status(200).json({
    message: "success",
    data: req.user,
  });
};

const forgotPassword = catchAsync(async (req, res, next) => {
  // salje mi njegov email

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError("Email does not exist", 404));
  }

  const resetToken = user.setAndGetForgotPasswordToken();

  // saljem reset token korisniku
  console.log("EVO GA HOSTNAME", req.hostname);
  const resetURL = `${req.protocol}://${req.hostname}/forgotPassoword/${resetToken}`;

  // treba sada poslati token korisniku na mail

  const mailOptions = {
    email: "kristijankiki884@gmail.com",
    subject: "Reset your password, valid for the next 10 minutes",
    text: `Your reset link: ${resetURL}`,
  };

  // Zasto ovde ne treba await, po meni treba da bih sacekao da se uspesno posalje mail pa onda da se vrati status
  sendMail(mailOptions);

  res.status(204);
});

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  filterBody,
  getMe,
  forgotPassword,
};

// da li cu sendResponse funkciju da drzim u utills ili helpers folderu?

// Zasta se koristi utills folder?
// On se obicno koristi za funkcije koje nemaju veze sa business logikom moje aplikacije

// Zasta se koristi helpers folder?
// On se obicno koristi za funkcije koje imaju veze sa business logikom moje aplikacije

// Da li sendResponse ima veze sa mojom business Logikom
// - NE

// Onda utils ili helpers

// Utills
