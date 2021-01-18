import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";

// const router = express.Router();
const router = express.Router({ mergeParams: true });

// need to add authcontroller later, only logged in user can write, edit, or delete their own comments.
router.get("/", getReviews);
router.post("/", createReview);

export default router;
