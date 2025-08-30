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
        required: [true, "Title is required"],
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
    },
    water: {
        type: String,
        required: [true, "Water type is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    // sale ce morati embedovanje
    sale: saleSchema,
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
