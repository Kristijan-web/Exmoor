"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// u slucaju da je sale definisan onda moraju i ostala polja
// Znaci uopste ne drzim istroiju popusta?
console.log("yo");
const saleSchema = new mongoose_1.default.Schema({
    discount: {
        type: String,
        // Ne dozvoljava da se unese vrednost za discount ako nije defisano polje sale
        validate: {
            validator: function (val) {
                // ako korisnik setuje sale_end, proveravamo da li postoji sale
                if (val && !this.sale) {
                    return false;
                }
                return true;
            },
            message: "Ne možeš uneti discount ako prvo nije unet sale.",
        },
    },
    sale_start: {
        type: Date,
        validate: {
            validator: function (val) {
                // ako korisnik setuje sale_end, proveravamo da li postoji sale
                if (val && !this.sale) {
                    return false;
                }
                return true;
            },
            message: "Ne možeš uneti sale_start ako prvo nije unet sale.",
        },
    },
    sale_end: {
        type: Date,
        validate: {
            validator: function (val) {
                // ako korisnik setuje sale_end, proveravamo da li postoji sale
                if (val && !this.sale) {
                    return false;
                }
                return true;
            },
            message: "Ne možeš uneti sale_end ako prvo nije unet sale.",
        },
    },
    // treba da se doda polje sold_total, da kad istekne akcija znamo koliko smo proizvoda prodali
    sold: {
        type: Number,
        validate: {
            validator: function (val) {
                // ako korisnik setuje sale_end, proveravamo da li postoji sale
                if (val && !this.sale) {
                    return false;
                }
                return true;
            },
            message: "Ne možeš uneti sold ako prvo nije unet sale.",
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
