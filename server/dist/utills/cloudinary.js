"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.API_CLOUDINARY,
    api_secret: process.env.API_PRIVATE_CLOUDINARY,
});
exports.default = cloudinary_1.v2;
