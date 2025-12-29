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

function parseProductBodyData(req: Request, res: Response, next: NextFunction) {
  if (req.body.sale) {
    req.body.sale = JSON.parse(req.body.sale);
  }
  next();
}

const deleteImageFromCloudinary = async function (public_id: string) {
  const options = { resource_type: "image" };
  const result = await cloudinary.uploader.destroy(public_id, options);
  console.log("Evo rezultata brisanja slike", result);
};

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  // Funkcija radi sve, i upload i update prima jednu i prima vise slika
  // Cela ideja je da se req.file.mainImage nalazi na kraju niza filesArray

  // Brisanje slike
  // Kako korisnik brise sliku?
  // - Tako sto na frontu klikne na sliku koju hoce da obrise

  // Kako korisnik dodaje nove slike na postojece?
  // Kada ode na upload image dugme onda tu ubace slike i one ce se dodati

  // Resenja:

  // 1. Kada se upload-uje slika mora da se ode do baze i na trenutni rezultat iz baze doda a ne da se sve overwrite-uje
  // - Znaci ovde treba da imam pristupu images iz baze, i taj images array da se doda

  // 2. Mada zar nije bolje da uzmem url-ove i sliku?
  // - Na frontu za data.images bi trebao da mi bude objekat koji ce imati property-e oldImages i newImages, oldImages ce sadrzati url-ove vec uploadanih slika a newImages su nove slike
  // (fajlovi)

  // Kako bih to obradio na back-u?
  // - Imao bih req.files.oldImages koji bi bio niz objekata uploadanih slika (stringovi)
  // - Imao bih req.files.newImages koji bi bio niz objkeata novih slika (fajlova)

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
  if (req.files && !Array.isArray(req.files) && req.files.images) {
    filesArray.push(...req.files.images);
  }

  if (req.files && !Array.isArray(req.files) && req.files.mainImage) {
    filesArray.push(...req.files.mainImage);
  }

  // poslao si update zahtev bez slike
  if (req.method === "PATCH" && filesArray?.length === 0) return next();

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

  // mora da se doda req.body.mainImage i req.body.images
  // problem je kada se uradi samo izmena "ostalih slika" onda .pop mutira originalni niz i izmeni se glavna slika
  // Koja su resenja?
  // - Koristiti pop samo ako je prosledjen mainImage

  // Kada se uploaduje samo mainImage ona skine ostale slike
  if (req.files && !Array.isArray(req.files) && req.files.mainImage) {
    req.body.mainImage = results.pop()?.secure_url;
  }
  if (req.files && !Array.isArray(req.files) && req.files.images) {
    req.body.images = results.map((r) => r.secure_url);
  }

  console.log("EVO req.body.images", req.body.images);
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
