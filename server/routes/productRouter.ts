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
import { protect, restrictTo } from "../controllers/authController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post(
  "/",
  protect,
  restrictTo("admin"),
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
  restrictTo("admin"),
  // Sta je ovde problem?
  // - oldImages se dodaje na images, sto znaci da moze da se prevazidje max count
  // - Umesto da je za images maxCount 5 sada ce biti 10
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  parseProductBodyData,
  uploadToCloudinary,
  deleteImageFromCloudinary,
  updateProduct
);
productRouter.delete("/:id", protect, restrictTo("admin"), deleteProduct);

// Sta me muci?
// - Muci me to sto delete operacija sa direktinim brisanjem slike i brisanjem preko update-a ne moze da se ponovo iskoriscava
// - Ukoliko radim direkno brisanje slike to je obican api request i brisanje slike iz baze

// Glavni problem:
// - Ukoliko radim update samo mainImage-a onda uopste nema potrebe da pozivam uploadToCloudinary, on ovde ispada je opcioni middleware

productRouter.delete(
  "/images/:id", // this is product_id
  protect,
  restrictTo("admin"),
  deleteImageFromCloudinary,
  updateProduct
);

// Brisanje slike iz admin panela se radi tako sto se pogodi endpoint
// Sta mi je potrebno da se obrise slika?
// - Njen publicId
// Najbolje da posaljem taj publicId preko urla
// productRouter.patch(
//   "/images",
//   protect,
//   restrictTo("admin"),
//   deleteImageFromCloudinary,
//   updateProduct
// );

export default productRouter;
