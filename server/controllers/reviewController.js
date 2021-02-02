import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import * as factory from "./handlerFactory.js";
import AppError from "../utils/appError.js";

export const getReviews = factory.getAll(Review, "reviews");

export const createReview = catchAsync(async (req, res, next) => {
  // HERE, we need to get user.id from params,
  // get to know film's id, then override any possible input data
  console.log(req)
  if (!req.user) {
    return next(new AppError("You need to login to create a review", 401));
  }
  const review = { ...req.body, user: req.user.id, film: req.params.filmId };
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
  // we push this user's id to likedBy array on review model, only if that id doesn't already exist there.
  // then we calc length of that array to get back likedCount
  // also populate that.
  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { likeCount: review.likeCount + 1 },
    { new: true }
  );

  // aggregate new piece of data.
  const newReview = await Review.aggregate([
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        likedCount: { $sum: { $size: "$likedBy" } },
      },
    },
  ]);

  const query = { id: req.params.id };
  const update = [
    {
      $set: {
        likedBy: {
          $setUnion: [{ $ifNull: ["$likedBy", []] }, [req.params.id]],
        },
      },
    },
    { $set: { likedCount: { $size: "$likedBy" } } },
  ];
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await skillSchema.findOneAndUpdate(query, update, options);

  res.json(updatedReview);
};

// factory.createOne(Review);
export const getReview = factory.getOne(Review, "review");

// if this review's creater's id === currentuser.id, we can delete it
// or current user's role is admin
export const updateReview = factory.updateOne(Review, "review");
export const deleteReview = factory.deleteOne(Review);
