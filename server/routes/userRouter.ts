import express from "express";
import {
  forgotPassword,
  login,
  logout,
  newPassword,
  protect,
  signup,
} from "../controllers/authController";
import {
  createUser,
  deleteUser,
  filterBody,
  getMe,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/newPassword/:token", newPassword);
// Zasto koristim /me umesto getUser endpoint-a?
// - Zato sto je getUser endpoint za admina, i on tu moze  da vidi id bilo kog usera, moze da dohvati bilo cije podatke  i da posalje id endpoint-u getUser preko url-a
// - /me je za korisnike da bi u njihovom browseru mogao da vratim njihove podatke sa servera preko jwt-a u httpOnly kolacicu i time oni ni ne znaju kako njihov id izgleda, tako da je "nemoguce" da im iko ukrade id jer nema nikakvog cuvanja id-a na njihovom browseru

userRouter.get("/me", protect, getMe);

// admin routes for CRUD
userRouter.get("/", protect, getUsers);
userRouter.get("/:id", protect, getUser);
userRouter.post("/", protect, filterBody, createUser);
userRouter.delete("/:id", protect, deleteUser);
userRouter.patch("/:id", protect, filterBody, updateUser);

export default userRouter;
