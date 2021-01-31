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

// const router = express.Router();
const router = express.Router({ mergeParams: true });

router.use(protect);

// need to add authcontroller later, only logged in user can write, edit, or delete their own comments.
router.route("/").get(getReviews).post(createReview);
// TODO: finish these
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);
router.route("/:id/likeReview").patch(likeReview);

export default router;
/* 
router
  .route("/") // since it is nested, now the base actually is /tour/:tourId/reviews/
  .get(getAllReviews)
  .post(restrictTo("user"), setTourUserIds, createReview);

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("admin"), updateReview) 

*/
