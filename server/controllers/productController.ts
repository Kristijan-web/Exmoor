import Product from "../models/productModel";
import AppError from "../utills/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utills/catchAsync";
import cloudinary from "../utills/cloudinary";
import type { UploadApiResponse } from "cloudinary";

// { [fieldname: string]: File[] }
type FileCheck = Express.Multer.File[];

// Sta fileArray moze biti?
// - Moze biti jedan objekat fajla
// - Moze biti niz objekata fajla
// - Moze biti prazan niz

// - Kako se zove tip multer fajla?

function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.body.sale) {
    req.body.sale = JSON.parse(req.body.sale);
  }
  next();
}

// Sta ako radim single file upload umesto multiple? Da li logiku za multiple i single drzim u jednoj funkciji?
// - Ako je single fajl samo cu da ga ubacim u array i tjt, da bude array sa jednim objektom

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  // Sad se sve menja jer imam jednu sliku i vise slika
  // Gde se one nalaze?
  // - u req.files.mainImage i req.files.images

  // Da li mogu da ostavim istu logiku?
  // - Za req.files.images mogu
  // - To jest mogu za sve fajkjl is req.files.mainImage ubacim u filesArray na prvom mestu i tjt, promise ce se nalazi na istom mestu bez obzira koji se prvi izvrsi u Promise.all

  // kod mene je sada req.files tipa { [fieldname: string]: File[] }
  let filesArray: FileCheck = [];

  // const mainImage = req.files.mainImage;
  // const images = req.file.images;

  if (req.files && !Array.isArray(req.files) && req.files.images) {
    filesArray = [...req.files.images];
  }

  if (req.files && !Array.isArray(req.files) && req.files.mainImage) {
    filesArray.push(...req.files.mainImage);
  }

  if (req.method === "PATCH" && filesArray?.length === 0) return next();

  // if (req.files) {
  //   // ovde se ts buni jer u nesto sto ocekuje niz upisujem { [fieldname: string]: File[] }
  //   filesArray = req.files;
  //   filesArray.push(req.files.mainImage);
  // }

  // if (req.file) {
  //   filesArray.push(req.file);
  // }

  filesArray.forEach((file) => {
    if (!file?.mimetype.startsWith("image/")) {
      return next(new AppError("Upload only images uploaded", 400));
    }
  });

  req.body.image = [];
  const uploadPromises = filesArray.map((file, i) => {
    const publicId = `user-${req.user.id}-${Date.now()}-${i}`;

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "users",
          public_id: publicId,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        }
      );

      stream.end(file.buffer);
    });
  });

  const results = await Promise.all(uploadPromises);

  req.body.image = results.map((r) => r.secure_url);

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
