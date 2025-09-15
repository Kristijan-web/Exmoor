"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.filterUserBody = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const factory_1 = require("./factory");
const catchAsync_1 = __importDefault(require("../utills/catchAsync"));
const appError_1 = __importDefault(require("../utills/appError"));
const sendResponse_1 = __importDefault(require("../utills/sendResponse"));
const filterUserBody = function (req, res, next) {
    req.body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phoneNumber: req.body.phoneNumber,
    };
    next();
};
exports.filterUserBody = filterUserBody;
// Napravi restrictTo middleware da odredjuje ko sme da pristupi endpoint-u
const getUsers = (0, factory_1.getAll)(userModel_1.default);
exports.getUsers = getUsers;
const getUser = (0, factory_1.getOne)(userModel_1.default);
exports.getUser = getUser;
const createUser = (0, factory_1.createOne)(userModel_1.default);
exports.createUser = createUser;
const deleteUser = (0, factory_1.deleteOne)(userModel_1.default);
exports.deleteUser = deleteUser;
const updateUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { _id } = req.user;
    // ne zaboravi da uradis filtraciju req.body, moze se poslati role: 'admin'
    const updatedDocument = await userModel_1.default.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedDocument) {
        return next(new appError_1.default(`User does not exist`, 404));
    }
    (0, sendResponse_1.default)(res, updatedDocument);
});
exports.updateUser = updateUser;
const getMe = function (req, res, next) {
    // korisnikovi podaci su u req.user
    const plain = req.user.toObject(); // ili .toJSON()
    delete plain._id;
    delete plain.password;
    res.status(200).json({
        message: "success",
        data: plain,
    });
};
exports.getMe = getMe;
