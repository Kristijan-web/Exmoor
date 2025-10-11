"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Polja:
// - Id kupovine
// - Id kupca (referenca)
// - Datum kupovine
// - Ukupna cena
const receitSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    purchase_date: {
        type: Date,
        default: Date.now,
    },
    total_price: {
        type: Number,
        required: true,
    },
    // purchases je embedovanje
    purchases: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
});
const receitModel = mongoose_1.default.model("Receit", receitSchema);
exports.default = receitModel;
