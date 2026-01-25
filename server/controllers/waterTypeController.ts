import WaterType from "../models/waterTypeModel";
import { createOne, getAll } from "./factory";

export const getWaterTypes = getAll(WaterType);

export const createWaterType = createOne(WaterType);
