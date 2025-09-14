"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.post("/signup", authController_1.signup);
userRouter.post("/login", authController_1.login);
userRouter.post("/logout", authController_1.logout);
userRouter.post("/forgotPassword", authController_1.forgotPassword);
userRouter.post("/newPassword/:token", authController_1.newPassword);
// Zasto koristim /me umesto getUser endpoint-a?
// - Zato sto je getUser endpoint za admina, i on tu moze  da vidi id bilo kog usera, moze da dohvati bilo cije podatke  i da posalje id endpoint-u getUser preko url-a
// - /me je za korisnike da bi u njihovom browseru mogao da vratim njihove podatke sa servera preko jwt-a u httpOnly kolacicu i time oni ni ne znaju kako njihov id izgleda, tako da je "nemoguce" da im iko ukrade id jer nema nikakvog cuvanja id-a na njihovom browseru
userRouter.get("/me", authController_1.protect, userController_1.getMe);
// admin routes for CRUD
userRouter.get("/", authController_1.protect, userController_1.getUsers);
userRouter.get("/:id", authController_1.protect, userController_1.getUser);
userRouter.post("/", authController_1.protect, userController_1.filterBody, userController_1.createUser);
userRouter.delete("/:id", authController_1.protect, userController_1.deleteUser);
userRouter.patch("/:id", authController_1.protect, userController_1.filterBody, userController_1.updateUser);
exports.default = userRouter;
