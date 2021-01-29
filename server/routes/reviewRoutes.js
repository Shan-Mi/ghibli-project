import express from "express";
import { restrictTo } from "../controllers/authController.js";
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

// need to add authcontroller later, only logged in user can write, edit, or delete their own comments.
router.get("/", getReviews).post("/", createReview);
// TODO: finish these
router
  .get("/:id", getReview)
  .patch("/:id", updateReview)
  .delete("/:id", deleteReview);
router.patch("/:id/likeReview", likeReview);

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
