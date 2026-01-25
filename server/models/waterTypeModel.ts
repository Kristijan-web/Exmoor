import mongoose from "mongoose";

const waterTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type polje je obavezno"],
  },
});

const WaterType = mongoose.model("WaterType", waterTypeSchema);

export default WaterType;
