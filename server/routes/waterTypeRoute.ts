import express from "express";
import {
  createWaterType,
  getWaterTypes,
} from "../controllers/waterTypeController";

const waterTypeRouter = express.Router();

waterTypeRouter.get("/", getWaterTypes);
waterTypeRouter.post("/", createWaterType);

export default waterTypeRouter;
