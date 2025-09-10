"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const factory_1 = require("./factory");
// crud operations for admin
const getProduct = (0, factory_1.getOne)(productModel_1.default);
exports.getProduct = getProduct;
const getProducts = (0, factory_1.getAll)(productModel_1.default);
exports.getProducts = getProducts;
const createProduct = (0, factory_1.createOne)(productModel_1.default);
exports.createProduct = createProduct;
const updateProduct = (0, factory_1.updateOne)(productModel_1.default);
exports.updateProduct = updateProduct;
const deleteProduct = (0, factory_1.deleteOne)(productModel_1.default);
exports.deleteProduct = deleteProduct;
