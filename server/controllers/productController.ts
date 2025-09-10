import Product from "../models/productModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";

// crud operations for admin

const getProduct = getOne(Product);

const getProducts = getAll(Product);

const createProduct = createOne(Product);

const updateProduct = updateOne(Product);

const deleteProduct = deleteOne(Product);

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
