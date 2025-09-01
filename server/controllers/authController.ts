import catchAsync from "../utills/catchAsync";
import User, { UserType } from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { Response } from "express";
import AppError from "../utills/appError";

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
    expires: new Date(Date.now() + +JWT_EXPIRES_IN_HOURS * 60 * 60 * 1000), // sati su u pitanju
    sameSite: "none" as "none",
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", jwtToken, cookieOptions);
}

// Router handlers

interface DecodedJWT {
  id: string;
}

const protect = catchAsync(async (req, res, next) => {
  //   - Provera da li je korisnik ulogovan (Da li postoji JWT token)
  // - Validacija JWT tokena
  // - Provera da li je korisniku u medjuvremenu obrisan nalog
  // - Provera da li je sifra i dalje validna, to jest ako je korisnik promenio sifru, onda ne bih trebao da moze da radi stari jwt token
  // - Izmeni req objekat i dodaj user-a iz baze req.user = currentUser i na kraju next()

  // jwt dolazi iz http-only cookie-a

  const jwtToken = req.cookies.jwt;

  // jwt.verify ce vratiti payload jwt-a
  const jwtPayload = jwt.verify(
    jwtToken,
    mustEnv("JWT_SECRET_KEY")
  ) as DecodedJWT;

  const user = await User.findById(jwtPayload.id);
  if (!user) {
    next(new AppError("User does not exist", 404));
  }
  // provera sifre da li je i dalje validan ovde mora da se koristi:
  // Instance method -> poziva se na instanci document-a
});

const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
  });
  if (!user) {
    next(
      new AppError(
        "Something went wrong creating a user, please contact developer",
        404
      )
    );
  }
  const jwtToken = createJWT(user);
  setJWTInHttpOnlyCookie(jwtToken, res);
  user.password = undefined as any;
  user.__v = undefined as any;
  sendResponse(res, user);
});

export { signup, protect };

// Problem
// - Ne treba vratiti sifru na frontend
// - Kako to izbeci, ali vodi racuna baza treba da vrati sifru kada radimo poredjenje sifri
// Resenja:
// - Tako da koristim pre-query middleware nije opcija
// - Mozda obican middleware u ruteru koji ce da na res.data.password = undefined
// - Svaki put pre nego se podaci posalju uradim user.password = undefined
