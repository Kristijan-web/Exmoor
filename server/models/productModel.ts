import mongoose from "mongoose";

// u slucaju da je sale definisan onda moraju i ostala polja
const saleSchema = new mongoose.Schema({
  discount: {
    type: String,
    required: function (this: any) {
      return this.sale != null;
    },
  },
  sale_start: {
    type: Date,
    required: function (this: any) {
      return this.sale != null;
    },
  },
  sale_end: {
    type: Date,
    required: function (this: any) {
      return this.sale != null;
    },
  },
});

const productSchema = new mongoose.Schema({
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

const Product = mongoose.model("Product", productSchema);

export default Product;
