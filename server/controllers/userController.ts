import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";

const filterBody = function (req: Request, res: Response, next: NextFunction) {
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

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  filterBody,
  getMe,
};
