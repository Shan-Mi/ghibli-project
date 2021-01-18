import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    Name: { type: String, required: true },
    Trailer: { type: String, required: true },
    Rating: { type: Number, required: true },
    Director: { type: String, required: true },
    Description: { type: String, required: true },
    YearOfProduction: { type: String, required: true },
    Runtime: { type: String, required: true },
    Review: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
    LikeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("film", filmSchema);
