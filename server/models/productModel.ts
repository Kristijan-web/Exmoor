import mongoose from "mongoose";

// u slucaju da je sale definisan onda moraju i ostala polja

// Znaci uopste ne drzim istroiju popusta?
// - Kada se zavrsi sale_end onda taj proizvod sa njegovim "sales" ide u posebni tabelu sales_history (koristi se biblioteka node-cron)
const saleSchema = new mongoose.Schema({
  discount: {
    type: Number,
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
  },
});
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Naziv je obavezan"],
    unique: true,
  },
  brand: {
    type: String,
    required: [true, "Brend je obavezan"],
  },
  gender: {
    type: String,
    required: [true, "Pol je obavezan"],
    enum: ["Muški", "Ženski"],
  },
  water: {
    type: String,
    required: [true, "Vrsta vode je obavezna"],
    enum: ["Parfem", "Toaletna", "Kolonjska"],
  },
  price: {
    type: Number,
    required: [true, "Cena je obavezna"],
  },
  quantity: {
    type: Number,
    required: [true, "Količina je obavezna"],
  },
  image: {
    type: String,
    required: [true, "Slika je obavezna"],
    unique: true,
  },
  // sale ce morati embedovanje
  sale: saleSchema,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
