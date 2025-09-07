import { UserType } from "../models/userModel";

const testFn = function (fn: (user: UserType) => void) {
  console.log("hello");
};

const secondFn: (a: any) => void = function () {};
// Neverovatno
// a: any ce raditi jer ako je any postoji sansa da bude UserType
// a: number nece raditi jer je precizniji tip i time znaci da nikada ne moze biti UserType
testFn(function (a: any) {});
