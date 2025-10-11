"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authController_1 = require("../controllers/authController");
const productRouter = express_1.default.Router();
productRouter.get("/", productController_1.getProducts);
productRouter.get("/:id", productController_1.getProduct);
productRouter.post("/", authController_1.protect, (0, authController_1.restirctTo)("admin"), productController_1.upload.single("image"), productController_1.createProduct);
productRouter.put("/:id", authController_1.protect, (0, authController_1.restirctTo)("admin"), productController_1.updateProduct);
productRouter.delete("/:id", authController_1.protect, (0, authController_1.restirctTo)("admin"), productController_1.deleteProduct);
exports.default = productRouter;
