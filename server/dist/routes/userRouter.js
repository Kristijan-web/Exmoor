"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const factory_1 = require("../controllers/factory");
const userRouter = express_1.default.Router();
userRouter.post("/signup", authController_1.signup);
userRouter.post("/login", authController_1.login);
userRouter.get("/", userController_1.getUsers);
userRouter.get("/:id", userController_1.getUser);
userRouter.post("/", userController_1.createUser);
userRouter.delete("/:id", userController_1.deleteUser);
userRouter.patch("/:id", factory_1.updateOne);
exports.default = userRouter;
