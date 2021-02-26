import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  getFilms,
  getOneFilm,
  createOneFilm,
  updateOneFilm,
  deleteOneFilm
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
  .patch(protect, restrictTo("admin"), updateOneFilm)
  .delete(protect, restrictTo("admin"), deleteOneFilm);

// nested route for each review for each film
router.use("/:filmId/reviews", reviewRouter);

export default router;
