import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    trailer: { type: String, required: true },
    rating: { type: Number, required: true },
    directors: { type: String, required: true },
    description: { type: String, required: true },
    releasedDate: { type: String, required: true },
    runtime: { type: Date, required: true },
    imageCover: { type: String, required: true },
    images: [{ type: String, required: true }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

const Film = mongoose.model("film", filmSchema);

export default Film;
