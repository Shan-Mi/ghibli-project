import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    trailer: { type: String, required: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    description: { type: String, required: true },
    yearofproduction: { type: String, required: true },
    runtime: { type: String, required: true },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

export default mongoose.model("film", filmSchema);
