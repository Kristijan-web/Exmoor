import express from "express";
import { createBrand, getBrands } from "../controllers/brandController";

const brandRouter = express.Router();

brandRouter.get("/", getBrands);
brandRouter.post("/", createBrand);

export default brandRouter;
