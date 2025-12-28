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
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  parseProductBodyData,
  uploadToCloudinary,
  createProduct
);
productRouter.patch(
  "/:id",
  protect,
  restirctTo("admin"),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  parseProductBodyData,
  uploadToCloudinary,
  updateProduct
);
productRouter.delete("/:id", protect, restirctTo("admin"), deleteProduct);

export default productRouter;
