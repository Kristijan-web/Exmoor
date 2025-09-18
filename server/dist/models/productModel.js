"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// u slucaju da je sale definisan onda moraju i ostala polja
const saleSchema = new mongoose_1.default.Schema({
    discount: {
        type: String,
        required: function () {
            return this.sale != null;
        },
    },
    sale_start: {
        type: Date,
        required: function () {
            return this.sale != null;
        },
    },
    sale_end: {
        type: Date,
        required: function () {
            return this.sale != null;
        },
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
