import catchAsync from "../utills/catchAsync";
import User, { UserType } from "../models/userModel";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { Response } from "express";

function mustEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

const JWT_SECRET_KEY = mustEnv("JWT_SECRET_KEY");
const JWT_EXPIRES_IN_HOURS = Number(mustEnv("JWT_EXPIRES_IN")); // npr. 5 (sati)

function sendResponse<T>(res: Response, data: HydratedDocument<T>) {
  res.status(200).json({
    message: "success",
    data,
  });
}

// prosledjeni argument mora biti instanca user modela znaci treba mi HydratedDocument
function createJWT(user: HydratedDocument<UserType>) {
  return jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: +JWT_EXPIRES_IN_HOURS * 60 * 60, // JWT_EXPIRES su satima,
  });
}

function setJWTInHttpOnlyCookie(jwtToken: string, res: Response) {
  const cookieOptions = {
    expires: new Date(Date.now() + +JWT_EXPIRES_IN_HOURS * 60 * 60), // sati su u pitanju
    sameSite: "none" as "none",
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", jwtToken, cookieOptions);
}

const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
  });
  const jwtToken = createJWT(user);
  setJWTInHttpOnlyCookie(jwtToken, res);
  sendResponse(res, user);
});

export { signup };
