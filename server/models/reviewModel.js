import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true, minlength: 20, maxlength: 1200 },
    createdAt: { type: Date, default: Date.now },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

    film: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "film" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

reviewSchema.index({ film: 1, user: 1 }, { unique: true });
// film + user combination always be unique
// reviewSchema.aggregate({
//   likedCount: {
//     $size: "$likedBy",
//   },
// });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Review = mongoose.model("review", reviewSchema);

export default Review;

// TODO:
// use virtual & populate likedCount, on film page, when a user logged in, we can get user's _id and that review's id, once the user clicked like, we add this review id into user's likedReview list(as an array),

// now add likedBy filed to reviewModel,
