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

const Product = mongoose.model("Product", productSchema);

export default Product;
