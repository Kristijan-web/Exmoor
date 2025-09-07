"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utills/appError"));
// interface AppErrorType extends Error {
//   isOperational?: boolean;
//   statusCode: number;
//   status: string;
// }
// Sta ja uopste zelim?
// - Da uradim type safety za sendProduction, error u send production moze biti ili AppError ili Error,
// Da li smatram da sam uradio type safety ako samo stavim error: AppErrorType?
// - Donekle, resice problem, ali nije istina da ce error uvek biti AppErrorType, takodje moze biti i Error
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
    console.log("Evo ga error objekat", error);
    res.status(500).send({
        message: error.message,
        stack: error.stack,
    });
}
// Sta sve moze da stigne kao tip podatka u error?
// - Moze da stigne AppErrorType ili obicni Error
// Sta ja zelim?
// - Da u sendProduction pravilno uradim logiku ako je error tipa AppErrorType
// Sta je problem?
// - Problem je taj sto lazem ts, govorim da ce svakie error biti tipa AppErrorType a moze stici i Error objekat
const globalErrorMiddleware = function (error, req, res, next) {
    if (process.env.NODE_ENV === "development") {
        sendDevelopment(error, res);
    }
    else {
        let err = error;
        sendProduction(err, res);
    }
};
exports.default = globalErrorMiddleware;
