import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import * as factory from "./handlerFactory.js";

// export const getReviews = catchAsync(async (req, res) => {
//   const reviews = await Review.find({});
//   // console.log(reviews);
//   res.status(200).json(reviews);
// });
export const getReviews = factory.getAll(Review);

export const createReview = catchAsync(async (req, res) => {
  // res.send("Created review");
  const review = req.body;
  const newReview = new Review(review);
  await newReview.save();
  res.status(200).json(newReview);
});

// factory.createOne(Review);
