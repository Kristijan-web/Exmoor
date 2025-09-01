"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendProduction() { }
function sendDevelopment(error, res) {
    console.log("Evo ga error objekat", error);
    res.status(500).send({
        message: error.message,
        stack: error.stack,
    });
}
const globalErrorMiddleware = function (error, req, res, next) {
    sendDevelopment(error, res);
};
exports.default = globalErrorMiddleware;
