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
  deleteImageFromCloudinary,
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
  // Sta je ovde problem?
  // - oldImages se dodaje na images, sto znaci da moze da se prevazidje max count
  // - Umesto da je za images maxCount 5 sada ce biti 10
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  parseProductBodyData,
  uploadToCloudinary,
  updateProduct
);
productRouter.delete("/:id", protect, restirctTo("admin"), deleteProduct);

// Brisanje slike iz admin panela se radi tako sto se pogodi endpoint
// Sta mi je potrebno da se obrise slika?
// - Njen publicId
// Najbolje da posaljem taj publicId preko urla
productRouter.delete(
  "/images/:public_id",
  protect,
  restirctTo("admin"),
  deleteImageFromCloudinary
);

export default productRouter;
