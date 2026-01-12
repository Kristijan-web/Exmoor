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

export const deleteImageFromCloudinary = catchAsync(async (req, res, next) => {
  // - Ako radim brisanje slike potreban mi je string sa front-a
  // - Ako radim update-e potreban mi je fajl sa front-a
  // Kako cu znati da li radim brisanje mainImage-a ili images dela?
  // Kako cu uopste znati da li moram da brisem sliku ili je ona prosledjena da se doda na trenutno postojece slike
  // Ako moram da imam if za samo brisanje slike i onda poseban if za brisanje slike preko upodate-a, da li je onda ova funkcija reusable?
  // Resenje:
  // - Umesto da deleteImageFromCloudinary bude middleware bice funkcija koju ce da pozivaju middleware-i po potrebi
  // Zasto ovako?
  // -  Kada se radi update slike ne mora uvek da znaci da ce se ona brisati, mozda se dodaje na trenutno postojece slike
  // -  U jednoj sitauciji znam da sigurno brisem sliku, u drugoj ne znam, i onda ne moze to biti istinski "zajednicki middleware"
  // ===========
  // Mora ce da se ovaj middleware poziva pre update middleware-a
  // Ako je sledecem middleware-u u nizu potrebna informacija u odnosu na prethodni middleware, kako dobijam pristup toj informaciji (req.body)
  // - Ako bih radio sa middleware-om morao bi da radim proveru da li postoji req.files.mainImage i ako postoji onda da radim brisanje

  // Da li mi je bitno dal brisem mainImage ili images sliku?
  // - Ne

  // Kako ove podatke mogu da izvucem na isti nacin bez obzira na nacin slanja?
  // - public_id mogu da izvucem iz req.public_id
  // - product_id mogu da izvucem iz req.body.product_id

  // Da li logika funkcije mora da se prilagodjava u zavisnosti od akcije/prosledjenih podataka
  // - Da -> Onda nije zajednicka funkcija
  // - Ne -> Jeste zajednicka funkcija

  const public_id = req.body.public_id; // id of image in the cloud
  // treba typeofImage
  const typeOfImage = req.body.typeOfImage; // mainImage | images

  // Ovaj middleware ne sme uvek da se izvrsi, samo ako je prosledjen public_id
  if (!public_id) {
    return next();
  }

  if (!req.body.oldImages) {
    return next(new Error("Mora da se proslede stare slike"));
  }
  console.log(req.body.public_id);

  const options = { resource_type: "image", invalidate: true };
  const result = await cloudinary.uploader.destroy(public_id, options);

  if (result.result === "not found") {
    return next(
      new Error(
        "Slika nije pronadjena, proveri da id ne sadrzi ekstenziju fajla "
      )
    );
  }
  console.log("SLIKA POSTOJI I USPESNO JE OBRISANA");
  // Ako je delete slike uspesan upada se u sledeci middleware, treba da se izmeni req.body
  // Mora da se udje u trenutke slike i obrise prosledjna slika
  // meni su stare slike u req.body.oldImages i samo udjem tu i obrisem ih sa filter i onda delim req.body.images = req.body.oldImages

  // A gde ja ovde imam logiku za mainImage

  // proveri kako izgleda public_id
  if (typeOfImage === "images") {
    req.body.images = req.body.oldImages.filter(
      (imagePath: string) => !imagePath.includes(public_id)
    );
    console.log("EVO ga req.body.images novi za update", req.body.images);
  }
  if (typeOfImage === "mainImage") {
    req.body.mainImage = null;
  }

  next();
});

const uploadToCloudinary = catchAsync(async (req, res, next) => {
  // Mora da se proveri da li vec mainImage u bazi i da se posalje delete request za njega

  // Treba da se proveri da li postoji req.files.mainImage i ako je on prosledjen da se ode do baze i proveri da li vec postoji mainImage

  // Kada treba da brisem mainImage iz baze?
  // - Samo kada klijent prosledjuje novu sliku za "mainImage"

  // Zasto bas tada?
  // -  Jer se tada jedino menja "mainImage" i onda treba da se obrise stara slika za mainImage
  // Sta kada klijent prvi put prosledjuje mainImage, jer tada nece biti mainImage-a u bazi?
  // - Imacu obicnu proveru koja proverava da li je baza nesto vratila
  if (!req.files || (req.files && Array.isArray(req.files)) || req.file) {
    console.log("OVDE treba da upadnem");
    // Zbog cega sam promenio odluku?
    // Zbog cega sam presao sa bacanja error-a na samo prelazak na sledeci middleware??
    // - Zbog novog edge-case-a koji je nastao
    // - Posto moze samo da se prosledi slika za brisanje onda nema potrebe da se poziva ovaj middleware, i zbog novog edge-case-a ovo je postao opcioni middleware
    // - Server je taj koji diktira pravila frotend-u i ako se freontend obrati serveru bez prosledjene slike, onda je server nece ni upisati u bazu

    // Zasto odmah nisam koristio logiku ispod?
    // - Jer kao server sam hteo da skrenem paznju frontend-u da njegov request nije dobar, medjutim sad ako mi prosledi lose podatke ja samo ih necu upisati u bazu al mu necu javiti da nije dobro uradio, mislim da je ovo dobro odluka jer sam ja taj koji upravlja i front-om i back-om

    // Pitanje
    // Edge-case-ovi mogu uticati na trenutnu logiku, posto je novim edge case-om uploadToCloudinary middleware postao opcion, time mora i logika u njemu da se promeni

    // Server mi vratio 200 a upload-ana slika nije prikazana?
    // - Posto sam ja u kontroli front-a i back-a to mi nije problem, ali ako samo radim back onda to mora da se prijavi kao error

    // Problem
    // OVO NISTA NE VALJA, ako se preskoci ovaj middleware onda ce se izbrisati stara "mainImage" slika a nova nece biti upload-ovano jer ce preskociti ovaj middleware
    // Ne svidja mi se sto je middleware u ruti opcion (uploadToCloudinary)
    // i uploadToCloudinary i deleteFromCloudinary rade update nad bazom
    console.log("Proveri multer upload kod routera");
    return next();
  }

  if (
    req.files &&
    req.method === "POST" &&
    !Array.isArray(req.files) &&
    !req.files.mainImage
  ) {
    return next(new AppError("Glavna slika mora da postoji", 400));
  }
  if (
    Array.isArray(req.body.images) &&
    typeof req.body.images[0] === "string"
  ) {
    req.body.images = [];
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

  // Ako se prosledi slika req.body.images ce biti niz jednog string-a te nove slike
  if (req.body.oldImages && Array.isArray(req.body.images)) {
    // ukoliko se prosledi samo 1 vrednost onda je ona u string formatu a ne u array-u
    if (typeof req.body.oldImages === "string") {
      req.body.oldImages = [req.body.oldImages];
    }
    req.body.oldImages.forEach((imagePath: string) => {
      req.body.images.push(imagePath);
    });
  }

  next();
});
// Bug:
// - Kada se posalje samo 1 "images" sa front-a, on ne bude u nizu nego cist string
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
