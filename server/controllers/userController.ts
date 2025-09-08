import User from "../models/userModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";

const getUsers = getAll(User);

const getUser = getOne(User);

const createUser = createOne(User);

const deleteUser = deleteOne(User);

const updateUser = updateOne(User);

export { getUsers, getUser, createUser, deleteUser, updateUser };
