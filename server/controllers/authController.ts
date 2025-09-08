import catchAsync from "../utills/catchAsync";
import User, { UserType } from "../models/userModel";
import jwt from "jsonwebtoken";
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

interface DecodedJWT {
  id: string;
  iat: number;
}

const protect = catchAsync(async (req, res, next) => {
  // - Provera da li je korisnik ulogovan (Da li postoji JWT token)
  // - Validacija JWT tokena
  // - Provera da li je korisniku u medjuvremenu obrisan nalog
  // - Provera da li je sifra i dalje validna, to jest ako je korisnik promenio sifru, onda ne bih trebao da moze da radi stari jwt token
  // - Izmeni req objekat i dodaj user-a iz baze req.user = currentUser i na kraju next()

  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    return next(new AppError("Not logged in!", 401));
  }

  // jwt.verify ce vratiti payload jwt-a
  const jwtPayload = jwt.verify(
    jwtToken,
    mustEnv("JWT_SECRET_KEY")
  ) as DecodedJWT;

  const user = await User.findById(jwtPayload.id);
  if (!user) {
    return next(new AppError("User does not exist", 404));
  }
  // provera sifre da li je i dalje validan ovde mora da se koris ti:
  // Instance method -> poziva se na instanci document-a
  if (user.isPasswordOld(jwtPayload.iat)) {
    return next(new AppError("Old password found please log in again", 401));
  }

  (req as any).user = user;
  next();
});

const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  if (!user) {
    return next(
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

const login = catchAsync(async (req, res, next) => {
  // Koji su edge case-ovi?
  // - Treba da se dohvati korisnik iz baze na osnovu email-a
  // - Treba da se izvrsi provera sifre, to jest poredjenje poslate sifre sa hash-ovanom, za to ima bcrypt.compare(poslata,iz_baze)
  // - Treba da se napravi jwt i posalje zajedno uz korisnikove podatke

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError("Email is incorrect", 404));
  }
  if (!user.doPasswordsMatch(req.body.password)) {
    return next(new AppError("Passwordis incorrect", 404));
  }
  const jwtToken = createJWT(user);
  setJWTInHttpOnlyCookie(jwtToken, res);
  sendResponse(res, user);
});

export { signup, protect, login };
