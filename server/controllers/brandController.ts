import Brand from "../models/brandModel";
import { createOne, getAll } from "./factory";

export const getBrands = getAll(Brand);

export const createBrand = createOne(Brand);
