"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendResponse(res, data) {
    res.status(200).json({
        message: "success",
        data,
    });
}
exports.default = sendResponse;
