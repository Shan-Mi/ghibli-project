import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import * as factory from "./handlerFactory.js";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";

export const getReviews = factory.getAll(Review, "reviews");

export const createReview = catchAsync(async (req, res, next) => {
  // HERE, we need to get user.id from params,
  // get to know film's id, then override any possible input data
  // console.log(req.params);
  if (!req.user) {
    return next(new AppError("You need to login to create a review", 401));
  }
  const review = { ...req.body, user: req.user.id, film: req.params.filmId };
  const newReview = new Review(review);

  // Error handling:
  // success: send back response
  // fail: send back error message
  await newReview
    .save()
    .then(() => res.status(200).json(newReview))
    .catch((err) => {
      // console.log(err);
      res.status(500).send(err);
    });
});

export const likeReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No review with id: ${id}`);

  // const review = await Review.findById(id);

  // TODO: make sure each user can only click once, likeCount can only increase by 1 for each user.
  // we push this user's id to likedBy array on review model, only if that id doesn't already exist there.
  // then we calc length of that array to get back likedCount
  // also populate that.

  const query = { _id: req.params.id };
  const update = [
    {
      $set: {
        likedBy: {
          $setUnion: [{ $ifNull: ["$likedBy", []] }, [req.user.id]],
        },
      },
    },
    { $set: { likedCount: { $size: "$likedBy" } } },
  ];
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const result = await Review.findOneAndUpdate(query, update, options);
  res.status(200).json(result);
});

export const getReview = factory.getOne(Review, "review");

// if this review's creater's id === currentuser.id, we can delete it
// or current user's role is admin
// export const updateReview = factory.updateOne(Review, "review");
export const deleteReview = factory.deleteOne(Review);

export const updateReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true, // return the new document
      runValidators: true, // will run validators before updated
    }
  );
  if (!doc) {
    return next(new AppError("Only creator can edit this review", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review: doc,
    },
  });
});
