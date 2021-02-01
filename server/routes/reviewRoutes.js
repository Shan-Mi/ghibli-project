import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  likeReview,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

// this is for nested films/filmId/reviews/
// only logged in user can write, edit, or delete their own comments.
router.route("/").get(getReviews).post(protect, createReview);

router
  .route("/:id")
  .get(getReview)
  .patch(protect, restrictTo("admin"), updateReview)
  .delete(protect, restrictTo("admin"), deleteReview);

router.route("/:id/likeReview").patch(protect, likeReview);

export default router;

// TODO:
// 1. updateReview and deleteReview
// should only allow the user who wrote that review and admin to update and delete
// now only admin can do that.
