import mongoose from "mongoose";

// Polja:
// - Id kupovine
// - Id kupca (referenca)
// - Datum kupovine
// - Ukupna cena

const receitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

const receitModel = mongoose.model("Receit", receitSchema);

export default receitModel;
