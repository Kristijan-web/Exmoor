import Product from "../models/productModel";
import AppError from "../utills/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utills/catchAsync";
import cloudinary from "../utills/cloudinary";

function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    // ovaj if je samo ako je slika za proizvod u pitanju
    req.body.image = `https://res.cloudinary.com/dyzvpvlgb/image/upload/v1761091272/${req.file.filename}`;
    if (req.body.sale) {
      req.body.sale = JSON.parse(req.body.sale);
    }
  }
  next();
}

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  // Upload the image
  if (!req.file?.path) {
    return next(new AppError("No file uploaded", 400));
  }

  await cloudinary.uploader.upload(req.file.path, options);

  next();
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // cb(new AppError("Not an image! Please upload only images.", 400), false);
    cb(new AppError("Not an image! Please upload only images.", 400));
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./dist/public/img/products");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const filename = `user-${req.user.id}-${Date.now()}.${extension}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
});

// crud operations for admin

const getProduct = getOne(Product);

const getProducts = getAll(Product);

const createProduct = createOne(Product);

const updateProduct = updateOne(Product);

const deleteProduct = deleteOne(Product);

export {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  parseProductBodyData,
  uploadToCloudinary,
  upload,
};
