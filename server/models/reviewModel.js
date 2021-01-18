import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({});

const Reviews = mongoose.model("review", reviewSchema);

export default Reviews;
