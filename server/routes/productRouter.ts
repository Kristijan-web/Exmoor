import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect, restirctTo } from "../controllers/authController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", protect, restirctTo("admin"), createProduct);
productRouter.put("/:id", protect, restirctTo("admin"), updateProduct);
productRouter.delete("/:id", protect, restirctTo("admin"), deleteProduct);

export default productRouter;
