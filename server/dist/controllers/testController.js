"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testFn = function (fn) {
    console.log("hello");
};
const secondFn = function () { };
// Neverovatno
// a: any ce raditi jer ako je any postoji sansa da bude UserType
// a: number nece raditi jer je precizniji tip i time znaci da nikada ne moze biti UserType
testFn(function (a) { });
