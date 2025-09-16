import catchAsync from "../utills/catchAsync";
import User, { UserType } from "../models/userModel";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { NextFunction, Response, Request } from "express";
import AppError from "../utills/appError";
import sendResponse from "../utills/sendResponse";
import sendMail from "../helpers/sendMail";
import crypto from "crypto";

interface DecodedJWT {
  id: string;
  iat: number;
}

function mustEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

const JWT_SECRET_KEY = mustEnv("JWT_SECRET_KEY");
const JWT_EXPIRES_IN_HOURS = Number(mustEnv("JWT_EXPIRES_IN")); // npr. 5 (sati)

// sendResponse funkcije je prebacena u utills folder

// prosledjeni argument mora biti instanca user modela znaci treba mi HydratedDocument
function createJWT(user: HydratedDocument<UserType>) {
  return jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: +JWT_EXPIRES_IN_HOURS * 60 * 60, // JWT_EXPIRES su satima, trenutno je stavljeno na 2 sata
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

const restirctTo =
  (...roles: [string]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access not allowed", 401));
    }

    next();
  };

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

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none" as "none",
  });

  res.status(204).send();
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new AppError("Email does not exist", 404));
  }

  const resetToken = user.setAndGetForgotPasswordToken();

  // saljem reset token korisniku
  const resetURL = `${req.protocol}://localhost:5173/nova-sifra/${resetToken}`;

  // treba sada poslati token korisniku na mail
  const mailOptions = {
    email: "kristijankiki884@gmail.com",
    subject: "Reset your password, valid for the next 10 minutes",
    text: `Your reset link: ${resetURL}`,
  };

  await sendMail(mailOptions);

  // mora se ugasiti validatori
  await user.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    message: "success",
  });
});

const newPassword = catchAsync(async (req, res, next) => {
  // - Get user based on the token
  // - Check if token has not expired and there is user, set the new password
  // - Update changedPasswordAt property for the user
  // - Log the user in, send JWT
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  // dohvati usera tako da proveravas da li postoji token i da li je expiro-ovo, sve u jednom query-u

  // GRESKA je ta sto proveravam ne kriptovan token sa kriptovanim u bazi!!!

  const encryptedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: encryptedToken,
    passwordResetTokenExpires: {
      $gte: new Date(),
    },
  });

  if (!user) {
    return next(new AppError("Token has expired", 400));
  }
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  const jwt = createJWT(user);
  setJWTInHttpOnlyCookie(jwt, res);
  // mislim da nema potrebe da prosledim user-a u reponse, dovoljno je samo jwt i onda kada se uradi reidrect dohvatice se novi podaci
  user.password = undefined as any;
  sendResponse(res, user);
});

const updatePassword = catchAsync(async (req, res, next) => {
  // Edge cases
  // - Uzima se trenutna sifra
  // - Poredi se sa hash-ovanom sifrom u bazi
  // - Upisuje se nova sifra
  // - await User.save() da bi se sacuvala promena

  // Trenutna sifra se uzima iz jwt-a

  // const currentPassword = req.user.password;

  // CurrentPassword ne sme da bude iz jwt-a preko da dodje preko frotnneda

  const currentPassword = req.body.currentPassword;
  if (!req.user.doPasswordsMatch(currentPassword)) {
    // ako se sifre poklapaju
    return next(new AppError("Stara šifra je ne tacna", 404));
  }
  req.user.password = req.body.password;
  req.user.confirmPassword = req.body.confirmPassword;

  await req.user.save();

  req.user.password = undefined;

  sendResponse(res, req.user);
});

export {
  signup,
  protect,
  login,
  logout,
  forgotPassword,
  newPassword,
  updatePassword,
  restirctTo,
};
