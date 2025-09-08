import express from "express";
import { login, signup } from "../controllers/authController";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController";
import { updateOne } from "../controllers/factory";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateOne);

export default userRouter;
