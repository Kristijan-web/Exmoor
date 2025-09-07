"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utills/appError"));
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
function handleInvalidId() {
    return new appError_1.default("Provided id is invalid", 400);
}
function handleDuplicateKey(err) {
    let uniqueField;
    for (const prop in err.keyValue) {
        uniqueField = prop;
    }
    return new appError_1.default(`${uniqueField} already exists`, 400);
}
function handleValidationError(err) {
    // Sta moze da pukne za validaciju?
    // - sifre se ne pokpalaju
    // - polje koje je required nje prosledjeno
    let firstError = Object.values(err.errors)[0];
    return new appError_1.default(`${firstError.message}`, 400);
}
function sendProduction(error, res) {
    if (error instanceof appError_1.default && error.isOperational) {
        res.status(error.statusCode).send({
            status: error.status,
            message: error.message,
            isOperational: true,
        });
    }
    else {
        res.status(500).send({
            status: "error",
            message: "Something went wrong",
        });
    }
}
function sendDevelopment(error, res) {
    res.status(500).send({
        message: error.message,
        error,
        stack: error.stack,
    });
}
const globalErrorMiddleware = function (error, req, res, next) {
    if (process.env.NODE_ENV === "development") {
        sendDevelopment(error, res);
    }
    else {
        let err = error;
        if (err.name === "CastError") {
            err = handleInvalidId();
        }
        if (err instanceof mongoose_1.default.Error.ValidationError &&
            err.name === "ValidationError") {
            err = handleValidationError(err);
        }
        if (err instanceof mongodb_1.MongoServerError && err.code === 11000) {
            err = handleDuplicateKey(err);
        }
        sendProduction(err, res);
    }
};
exports.default = globalErrorMiddleware;
