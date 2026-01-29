import mongoose from "mongoose";

const waterTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type polje je obavezno"],
    },
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
  }
);

const WaterType = mongoose.model("WaterType", waterTypeSchema);

export default WaterType;
