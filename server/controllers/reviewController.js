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

export const updateReview = () => {};
export const deleteReview = () => {};
