import Product from "../models/productModel";
import AppError from "../utills/appError";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factory";
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utills/catchAsync";
import cloudinary from "../utills/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import sendResponse from "../utills/sendResponse";

// { [fieldname: string]: File[] }
type FileCheck = Express.Multer.File[];

function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.body.sale) {
    req.body.sale = JSON.parse(req.body.sale);
  }
  next();
}

export const deleteImageFromCloudinary = catchAsync(async (req, res, next) => {
  // Problems to fix:
  // - Need to delete image path from database

  // we take the part without the extension
  const public_id = decodeURIComponent(req.params.public_id).split(".")[0]; // public_id has .jpg so we take left part
  const product_id = req.body.id;
  const typeOfImage = req.body.typeOfImage; // It can be "mainImage" or "images"

  if (!typeOfImage) {
    return next(new Error("Nije prosledjen typeOfImage"));
  }

  if (!public_id) {
    return next(new Error("Nije prosledjen public_id"));
  }
  if (!product_id) {
    return next(new Error("Nije prosledjen product_id"));
  }
  const options = { resource_type: "image", invalidate: true };
  const result = await cloudinary.uploader.destroy(public_id, options);

  if (result.result === "not found") {
    return next(
      new AppError(
        "Slika nije pronadjena, ako se greska nastavi molimo kontaktirajte developera",
        400
      )
    );
  }

  if (result.result === "ok") {
    // Greska je sto $pull ne moze da se primeni nad elementom koji nije niz
    let deletedProductFromDB;
    if (typeOfImage === "images") {
      deletedProductFromDB = await Product.findByIdAndUpdate(
        product_id,
        {
          $pull: {
            images: { $regex: public_id },
          },
        },
        { new: true, runValidators: true }
      );
    }

    if (typeOfImage === "mainImage") {
      deletedProductFromDB = await Product.findByIdAndUpdate(
        product_id,
        {
          $unset: {
            mainImage: "",
          },
        },
        { new: true, runValidators: true }
      );
    }

    if (!deletedProductFromDB) {
      return next(
        new AppError(
          "Provided image does not exist, please contact the developer",
          404
        )
      );
    }
  }

  sendResponse(res, result.result, 204);
});

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  if (!req.files || (req.files && Array.isArray(req.files)) || req.file) {
    console.log("Proveri multer upload kod routera");
    return next(new AppError("Greska na serveru...", 500));
  }

  if (
    req.files &&
    req.method === "POST" &&
    !Array.isArray(req.files) &&
    !req.files.mainImage
  ) {
    return next(new AppError("Glavna slika mora da postoji", 400));
  }

  // Ako je POST request onda mora da postoji mainImage
  let filesArray: FileCheck = [];

  if (req.files.images) {
    filesArray.push(...req.files.images);
  }

  if (req.files.mainImage) {
    filesArray.push(...req.files.mainImage);
  }

  // poslao si update zahtev bez slike
  if (req.method === "PATCH" && filesArray?.length === 0) return next();

  filesArray.forEach((file) => {
    if (!file?.mimetype.startsWith("image/")) {
      return next(new AppError("Upload only images uploaded", 400));
    }
  });

  const uploadPromises = filesArray.map((file, i) => {
    const publicId = `user-${req.user.id}-${Date.now()}-${i}`;

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
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
  if (req.files.mainImage) {
    req.body.mainImage = results.pop()?.secure_url;
  }
  if (req.files.images) {
    req.body.images = results.map((r) => r.secure_url);
  }
  console.log("EVO ga req.body", req.body);
  // Ako je req.files file objekat a req.images niz stringo-ova onda ne sme da se radi upis u req.body.images
  if (req.body.oldImages && typeof req.body.images[0] !== "string") {
    console.log("ALOO UPAO OVDE");
    console.log("Evo ga req.body.images", req.body.images);
    // ukoliko se prosledi samo 1 vrednost onda je ona u string formatu a ne u array-u
    if (typeof req.body.oldImages === "string") {
      req.body.oldImages = [req.body.oldImages];
    }
    req.body.oldImages.forEach((imagePath: string) => {
      // Unique contstraint u bazi sprecava upis vise istih slika
      // Sta se desava kada se prosledi jedna slika za images
      // 1. Rezultat novih slika iz "images" je upisan u req.body.images
      // 2. Stare slike sa front-a su upisane u req.body.
      // 3. i onda se izvrsi update koji ih sve zameni

      // Kako onda dodavanje samo mainImage-a pravi problem?
      // - Jer onda images niz string-ova slika a ne fajl slike/slika i onda dolazi do duplog upisivanja

      // Kako ce to da resim?
      // - Treba da zabranim ulaz u req.body.oldImages, jer ce onda req.body.images uzeti niz string-ova sa front-a
      req.body.images.push(imagePath);
    });
  }

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
