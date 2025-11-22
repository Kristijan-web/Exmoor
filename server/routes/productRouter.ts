import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
  parseProductBodyData,
  uploadToCloudinary,
} from "../controllers/productController";
import { protect, restirctTo } from "../controllers/authController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post(
  "/",
  protect,
  restirctTo("admin"),
  upload.single("image"),
  parseProductBodyData,
  uploadToCloudinary,
  createProduct
);
productRouter.put("/:id", protect, restirctTo("admin"), updateProduct);
productRouter.delete("/:id", protect, restirctTo("admin"), deleteProduct);

export default productRouter;
