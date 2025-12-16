import Product from "../models/productModel";
import AppError from "../utills/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utills/catchAsync";
import cloudinary from "../utills/cloudinary";
import type { UploadApiResponse } from "cloudinary";
function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    // Ova linija dole ce morati refacture
    req.body.image = `https://res.cloudinary.com/dyzvpvlgb/image/upload/v1761091272/${req.file.filename}`;
  }
  if (req.body.sale) {
    req.body.sale = JSON.parse(req.body.sale);
  }
  next();
}
const uploadToCloudinary = catchAsync(async (req, res, next) => {
  const file = req.file;

  console.log("EVO FAJLA", file);

  if (!file?.buffer) {
    return next(new AppError("No file uploaded", 400));
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
  // ✅ Always use secure_url from Cloudinary response
  req.body.image = cloudinaryResult.secure_url;
  // req.body.imagePublicId = cloudinaryResult.public_id; // store this for deletes

  next();
});

// const multerFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (file.mimetype.startsWith("image")) {
//     return cb(null, true);
//   } else {
//     return cb(new AppError("Not an image! Please upload only images.", 400));
//   }
// };

// const multerStorage = multer.memoryStorage({
//   // nema smisla da stoji ovaj destination jer se slika upload-uje na cloudinary i odatle prikazuje korisniku
//   destination: (req, file, cb) => {
//     cb(null, "./dist/public/img/products");
//   },
//   filename: (req, file, cb) => {
//     // ovde moze nastati bug ako korisnik ne prosledi sliku
//     const extension = file.mimetype.split("/")[1];
//     const filename = `user-${req.user.id}-${Date.now()}.${extension}`;
//     req.body.image = `https://res.cloudinary.com/dyzvpvlgb/image/upload/v1761091272/${filename}`;

//     cb(null, filename);
//   },
// });

// Radi filtraciju u middleware-u za cloduinary i tu upload da se izvrsi
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
