import Product from "../models/productModel";
import AppError from "../utills/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utills/catchAsync";
import cloudinary from "../utills/cloudinary";
import type { UploadApiResponse } from "cloudinary";

function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.body.sale) {
    req.body.sale = JSON.parse(req.body.sale);
  }
  next();
}

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  const file = req.files;

  if (req.method === "PATCH" && !file) return next();

  if (!file?.mimetype.startsWith("image/")) {
    return next(new AppError("No image uploaded", 400));
  }

  const publicId = `user-${req.user.id}-${Date.now()}`;

  const options = {
    folder: "users",
    public_id: publicId,
    overwrite: true,
  };

  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        }
      );

      stream.end(file.buffer);
    }
  );
  req.body.image = cloudinaryResult.secure_url;
  // req.body.imagePublicId = cloudinaryResult.public_id; // store this for deletes

  next();
});

const upload = multer({
  storage: multer.memoryStorage(),
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
