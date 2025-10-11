"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const appError_1 = __importDefault(require("../utills/appError"));
const factory_1 = require("./factory");
const multer_1 = __importDefault(require("multer"));
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        // cb(new AppError("Not an image! Please upload only images.", 400), false);
        cb(new appError_1.default("Not an image! Please upload only images.", 400));
    }
};
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/products");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
    },
});
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.upload = upload;
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
