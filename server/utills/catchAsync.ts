import { Request, Response } from "express";
import AppError from "./appError";

type AppNext = (err?: AppError) => void;

// Sta mi nije jasno?
// Ako sam rekao da funkcija ocekuje parametar tipa AppNext koji je opcioni AppError parametar a ja mu prosledjujem NextFunction koji ima tip any i moze biti obican string 'eeeee' to odmah znaci da ne ispunjavam ono sto prosledjena funkcija ocekuje, zasto onda ts ne prijavljuje error kod fn(req,res,next)

// - Proveri pretpostovaku, da kada se izvrava anonimna funkcija i poziva fn(req,res,next) da next ocekuje AppNext =====> DA
// - Proveri pretpostavku, da kada imam specifican tip parametra da onda ne moze da se prosledi any, npr:
// type User = {name: string, email: string}
// const getUser = function(user: User) {}   getUser('yo')

// RESENJE DONEKLE: TYPESCRIPT TYPES SE PONASAJU DRUGACIJE KADA SU U PITANJU FUNKCIJE, NE RADI OCEKIVANO KAO SA OBJECT/VALUES
const catchAsync = function (
  fn: (req: Request, res: Response, next: AppNext) => Promise<void>
) {
  return (req: Request, res: Response, next: AppNext) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

export default catchAsync;
