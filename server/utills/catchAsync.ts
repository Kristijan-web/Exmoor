import { Request, Response } from "express";
import AppError from "./appError";

type AppNext = (err?: AppError) => void;

// RESENJE DONEKLE: TYPESCRIPT TYPES SE PONASAJU DRUGACIJE KADA SU U PITANJU FUNKCIJE, NE RADI OCEKIVANO KAO SA OBJECT/VALUES
// - (Uz --strictFunctionTypes) parametri su kontravariantni: funkcija koju prosleđuješ sme da prima širi tip od onog koji se očekuje.
// - Tako da nekim cudom kod funkcija moze any da se prosledi ukoliko ja naveden specificni parametar

// Zasto uopste pravim catchAsync?
// - catchAsync je wraper, koji ce dodati dodatnu logiku na prosledjenu asinhronu funkciju, da ne bih tu logiku stalno ponavljao, na primer try, catch

// Kako radi catchAsync, kada se koristi kao wrapper za router middlewere?
// - catchAsync ce se pozvati odmah kada se pokrene server, i u njemu prosledimo logiku koja ce se izvrsiti kada se pogodi router
// - On vraca istu funkciju koji je primio sa dodatnom logikom
// - Funkciju koja prima catchAsync kao parametar oznacava funkciju koju ce catchAsync primiti i pozvati
// - U return delu ove funkcije su parametri koji ce stidi od request-a

const catchAsync = function (
  fn: (req: Request, res: Response, next: AppNext) => Promise<void>
) {
  return (req: Request, res: Response, next: AppNext) => {
    // Zasto next(err) ts ne izbacuje gresku
    // - ts se drugacije ponasa kada se tipizira parametar funkcije, posto je err: any on prihvata isti ili siri tip
    fn(req, res, next).catch((err) => next(err));
  };
};

export default catchAsync;
