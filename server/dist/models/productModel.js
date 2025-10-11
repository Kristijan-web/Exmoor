"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// u slucaju da je sale definisan onda moraju i ostala polja
// Znaci uopste ne drzim istroiju popusta?
// - Kada se zavrsi sale_end onda taj proizvod sa njegovim "sales" ide u posebni tabelu sales_history (koristi se biblioteka node-cron)
const saleSchema = new mongoose_1.default.Schema({
    discount: {
        type: String,
        required: true,
    },
    sale_start: {
        type: Date,
        required: true,
    },
    sale_end: {
        type: Date,
        required: true,
    },
    // treba da se doda polje sold, da kad istekne akcija znamo koliko smo proizvoda prodali
    sold: {
        type: Number,
        required: true,
    },
});
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Naziv je obavezan"],
    },
    brand: {
        type: String,
        required: [true, "Brend je obavezan"],
    },
    water: {
        type: String,
        required: [true, "Vrsta vode je obavezna"],
    },
    price: {
        type: Number,
        required: [true, "Cena je obavezna"],
    },
    quantity: {
        type: Number,
        required: [true, "Količina je obavezna"],
    },
    // sale ce morati embedovanje
    sale: saleSchema,
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
