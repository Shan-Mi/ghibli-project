import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import * as factory from "./handlerFactory.js";

// export const getReviews = catchAsync(async (req, res) => {
//   const reviews = await Review.find({});
//   // console.log(reviews);
//   res.status(200).json(reviews);
// });
export const getReviews = factory.getAll(Review, "reviews");

export const createReview = catchAsync(async (req, res) => {
  // res.send("Created review");
  const review = req.body;
  const newReview = new Review(review);
  await newReview.save();
  res.status(200).json(newReview);
});

export const likeReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No review with id: ${id}`);

  const review = await Review.findById(id);

  // TODO: make sure each user can only click once, likeCount can only increase by 1 for each user.
  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { likeCount: review.likeCount + 1 },
    { new: true }
  );

  res.json(updatedReview);
};

// factory.createOne(Review);
