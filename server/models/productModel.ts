import mongoose from "mongoose";

// u slucaju da je sale definisan onda moraju i ostala polja

// Znaci uopste ne drzim istroiju popusta?
// - Kada se zavrsi sale_end onda taj proizvod sa njegovim "sales" ide u posebni tabelu sales_history (koristi se biblioteka node-cron)

// Treba da se uradi referenca na brand polje
// - Polje brand moze sadrzati samo polje iz brand kolekcije

// 1. Ko je parent a ko child kolekcija?
// Da li brand ima smisla bez proizvoda -> Da
// Da li proizvod ima smisla bez brand-a -> Ne

// Brand je parent
// Child je proizvod

// Koji odnos imaju?
// Jedan brand moze da pripada vise proizvoda dok jedan proizvod moze da pripada jednom brand-u -> 1:M (one to many)

const saleSchema = new mongoose.Schema({
  discount: {
    type: Number,
  },
  sale_start: {
    type: Date,
  },
  sale_end: {
    type: Date,
  },
  // treba da se doda polje sold, da kad istekne akcija znamo koliko smo proizvoda prodali
  sold: {
    type: Number,
  },
});
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Naziv je obavezan"],
      unique: true,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: [true, "Brand moze da postoji"],
    },
    gender: {
      type: String,
      required: [true, "Pol je obavezan"],
      enum: ["Muški", "Ženski"],
    },
    waterType: {
      type: mongoose.Schema.ObjectId,
      ref: "WaterType",
      required: [true, "waterType je obavezno polje"],
    },
    price: {
      type: Number,
      required: [true, "Cena je obavezna"],
    },
    quantity: {
      type: Number,
      required: [true, "Količina je obavezna"],
    },
    mainImage: {
      type: String,
      unique: true,
    },
    images: {
      type: [String],
      unique: true,
    },

    // sale ce morati embedovanje
    sale: saleSchema,
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
