import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  getFilms,
  getOneFilm,
  createOneFilm,
  updateOneFilm,
} from "../controllers/filmController.js";
import reviewRouter from "../routes/reviewRoutes.js";

const router = express.Router();

router
  .route("/")
  .get(getFilms)
  .post(protect, restrictTo("admin"), createOneFilm);

router
  .route("/:id")
  .get(getOneFilm)
  .patch(protect, restrictTo("admin"), updateOneFilm);

// nested route for each review for each film
router.use("/:filmId/reviews", reviewRouter);

export default router;
