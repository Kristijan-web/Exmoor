"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.signup = void 0;
const catchAsync_1 = __importDefault(require("../utills/catchAsync"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../utills/appError"));
function mustEnv(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing env var: ${key}`);
    return v;
}
const JWT_SECRET_KEY = mustEnv("JWT_SECRET_KEY");
const JWT_EXPIRES_IN_HOURS = Number(mustEnv("JWT_EXPIRES_IN")); // npr. 5 (sati)
function sendResponse(res, data) {
    res.status(200).json({
        message: "success",
        data,
    });
}
// prosledjeni argument mora biti instanca user modela znaci treba mi HydratedDocument
function createJWT(user) {
    return jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET_KEY, {
        expiresIn: +JWT_EXPIRES_IN_HOURS * 60 * 60, // JWT_EXPIRES su satima,
    });
}
function setJWTInHttpOnlyCookie(jwtToken, res) {
    const cookieOptions = {
        expires: new Date(Date.now() + +JWT_EXPIRES_IN_HOURS * 60 * 60 * 1000), // sati su u pitanju
        sameSite: "none",
        secure: true,
        httpOnly: true,
    };
    res.cookie("jwt", jwtToken, cookieOptions);
}
const protect = (0, catchAsync_1.default)(async (req, res, next) => {
    //   - Provera da li je korisnik ulogovan (Da li postoji JWT token)
    // - Validacija JWT tokena
    // - Provera da li je korisniku u medjuvremenu obrisan nalog
    // - Provera da li je sifra i dalje validna, to jest ako je korisnik promenio sifru, onda ne bih trebao da moze da radi stari jwt token
    // - Izmeni req objekat i dodaj user-a iz baze req.user = currentUser i na kraju next()
    // jwt dolazi iz http-only cookie-a
    const jwtToken = req.cookies.jwt;
    // jwt.verify ce vratiti payload jwt-a
    const jwtPayload = jsonwebtoken_1.default.verify(jwtToken, mustEnv("JWT_SECRET_KEY"));
    const user = await userModel_1.default.findById(jwtPayload.id);
    if (!user) {
        next(new appError_1.default("User does not exist", 404));
    }
    // provera sifre da li je i dalje validan ovde mora da se koristi:
    // Instance method -> poziva se na instanci document-a
});
exports.protect = protect;
const signup = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = await userModel_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phoneNumber: req.body.phoneNumber,
    });
    if (!user) {
        next(new appError_1.default("Something went wrong creating a user, please contact developer", 404));
    }
    const jwtToken = createJWT(user);
    setJWTInHttpOnlyCookie(jwtToken, res);
    user.password = undefined;
    user.__v = undefined;
    sendResponse(res, user);
});
exports.signup = signup;
// Problem
// - Ne treba vratiti sifru na frontend
// - Kako to izbeci, ali vodi racuna baza treba da vrati sifru kada radimo poredjenje sifri
// Resenja:
// - Tako da koristim pre-query middleware nije opcija
// - Mozda obican middleware u ruteru koji ce da na res.data.password = undefined
// - Svaki put pre nego se podaci posalju uradim user.password = undefined
