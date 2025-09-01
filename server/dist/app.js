"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// omoguci parsiranje body-a
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/users", userRouter_1.default);
// setup global error handling middleware
app.use(errorController_1.default);
exports.default = app;
