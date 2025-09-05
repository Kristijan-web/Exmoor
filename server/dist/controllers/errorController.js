"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendProduction(error, res) {
    // if(error.isOperational) {
    //   res.status(error.statusCode).send({
    //     status: error.status
    //     message: error.message,
    //     isOperationa: true
    //   })
    // }
}
function sendDevelopment(error, res) {
    console.log("Evo ga error objekat", error);
    res.status(500).send({
        message: error.message,
        stack: error.stack,
    });
}
const globalErrorMiddleware = function (error, req, res, next) {
    if (process.env.NODE_ENV === "development") {
        sendDevelopment(error, res);
    }
    else {
        sendProduction(error, res);
    }
};
exports.default = globalErrorMiddleware;
