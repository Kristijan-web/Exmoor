"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RESENJE DONEKLE: TYPESCRIPT TYPES SE PONASAJU DRUGACIJE KADA SU U PITANJU FUNKCIJE, NE RADI OCEKIVANO KAO SA OBJECT/VALUES
// - (Uz --strictFunctionTypes) parametri su kontravariantni: funkcija koju prosleđuješ sme da prima širi tip od onog koji se očekuje.
// - Tako da nekim cudom kod funkcija moze any da se prosledi ukoliko ja naveden specificni parametar
const catchAsync = function (fn) {
    console.log("izvrsio se wrapper");
    return (req, res, next) => {
        // Zasto next(err) ts ne izbacuje gresku
        // - ts se drugacije ponasa kada se tipizira parametar funkcije, posto je err: any on prihvata isti ili siri tip
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.default = catchAsync;
