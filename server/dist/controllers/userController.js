"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.getMe = exports.filterBody = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const factory_1 = require("./factory");
const catchAsync_1 = __importDefault(require("../utills/catchAsync"));
const appError_1 = __importDefault(require("../utills/appError"));
const sendMail_1 = __importDefault(require("../helpers/sendMail"));
const filterBody = function (req, res, next) {
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
exports.filterBody = filterBody;
// Napravi restrictTo middleware da odredjuje ko sme da pristupi endpoint-u
const getUsers = (0, factory_1.getAll)(userModel_1.default);
exports.getUsers = getUsers;
const getUser = (0, factory_1.getOne)(userModel_1.default);
exports.getUser = getUser;
const createUser = (0, factory_1.createOne)(userModel_1.default);
exports.createUser = createUser;
const deleteUser = (0, factory_1.deleteOne)(userModel_1.default);
exports.deleteUser = deleteUser;
const updateUser = (0, factory_1.updateOne)(userModel_1.default);
exports.updateUser = updateUser;
const getMe = function (req, res, next) {
    // korisnikovi podaci su u req.user
    req.user.password = undefined;
    req.user._id = undefined;
    res.status(200).json({
        message: "success",
        data: req.user,
    });
};
exports.getMe = getMe;
const forgotPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    // salje mi njegov email
    const user = await userModel_1.default.findOne({
        email: req.body.email,
    });
    if (!user) {
        return next(new appError_1.default("Email does not exist", 404));
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
    (0, sendMail_1.default)(mailOptions);
    res.status(204);
});
exports.forgotPassword = forgotPassword;
// da li cu sendResponse funkciju da drzim u utills ili helpers folderu?
// Zasta se koristi utills folder?
// On se obicno koristi za funkcije koje nemaju veze sa business logikom moje aplikacije
// Zasta se koristi helpers folder?
// On se obicno koristi za funkcije koje imaju veze sa business logikom moje aplikacije
// Da li sendResponse ima veze sa mojom business Logikom
// - NE
// Onda utils ili helpers
// Utills
