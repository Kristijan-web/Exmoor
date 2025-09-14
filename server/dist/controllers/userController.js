"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.filterBody = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const factory_1 = require("./factory");
const filterBody = function (req, res, next) {
    req.body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phoneNumber: req.body.phoneNumber,
    };
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
