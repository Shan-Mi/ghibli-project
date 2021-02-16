import mongoose from "mongoose";
import slugify from "slugify";

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
      type: Date,
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

// once write data into db, a slug will be generated automatically
filmSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// populate reviews filed for films
filmSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
    // have to select _id, because we use this as the localField
    select: "-__v",
  });
  next();
});

const Film = mongoose.model("film", filmSchema);

export default Film;
