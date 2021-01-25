import reviewModel from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({});
  console.log(reviews);
  res.status(200).json(reviews);
});

export const createReview = catchAsync(async (req, res) => {
  // res.send("Created review");
  const review = req.body;
  const newReview = new Review(review);
  await newReview.save();
  res.status(200).json(newReview);
});

/* 
title: { type: String, required: true },
    name: { type: String, required: true },
    trailer: { type: String, required: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    description: { type: String, required: true },
    yearofproduction: { type: String, required: true },
    runtime: { type: String, required: true },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],

    ID need to be edited later
Castle in the sky | ✔ .
Grave of the Fireflies | ✔ 
My Neighbor Totoro | ✔ 
Kiki's Delivery Service | ✔ 
Only Yesterday  | ✔ 
Porco Rosso | ✔ 
Pom Poko | ✔ 
Whisper of the Heart | ✔ 
Princess Mononoke | ✔ 
My Neighbors the Yamadas | ✔ 
Spirited Away | ✔ 
The Cat Returns | ✔ 
Howl's Moving Castle | ✔ 
Tales from Earthsea | ✔ 
Ponyo | ✔ 
Arrietty | ✔ 
From Up on Poppy Hill | ✔ 
The Wind Rises | ✔ 
The Tale of the Princess Kaguya
*/
