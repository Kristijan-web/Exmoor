"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (options) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: "Kristijan Stojanovic krimster8@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.text,
    };
    await transporter.sendMail(mailOptions);
};
exports.default = sendMail;
