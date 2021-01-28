import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, minlength: 50, maxlength: 1200 },
  likecount: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "author",
  },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
