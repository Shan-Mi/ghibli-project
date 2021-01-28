import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, minlength: 20, maxlength: 1200 },
  likeCount: { type: Number, default: 0 },
  film: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "film" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
// tour + user combination always be unique

reviewSchema.pre(/^find/, function (next) {
  // 2 queries will need longer time
  // this.populate({ path: 'tour', select: 'name' }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});


const Review = mongoose.model("review", reviewSchema);

export default Review;
