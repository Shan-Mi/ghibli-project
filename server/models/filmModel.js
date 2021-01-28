import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A film must have a name"], // a validator
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    trailer: { type: String, required: [true, "A film must have a trailer"] },
    rating: { type: Number, required: [true, "A film must have a rating"] },
    directors: {
      type: String,
      required: [true, "A film must have director's name"],
    },
    description: {
      type: String,
      required: [true, "A film must have a description"],
    },
    releasedDate: {
      type: String,
      required: [true, "A film must have a releasedDate"],
    },
    runtime: { type: String, required: [true, "A film must have a runtime"] },
    imageCover: {
      type: String,
      required: [true, "A film must have a cover image"],
    },
    images: [String],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

filmSchema.virtual("reviews", {
  ref: "review",
  foreignField: "film", // where film's id is stored
  localField: "_id", // film
});

const Film = mongoose.model("film", filmSchema);

export default Film;
