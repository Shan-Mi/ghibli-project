import reviewModel from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({});
  console.log(reviews);
  res.status(200).json(reviews);
});

export const createReview = catchAsync(async (req, res) => {
  res.send("Created review");
});
