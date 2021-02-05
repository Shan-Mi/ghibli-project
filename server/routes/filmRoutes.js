import express from "express";
import {
  getFilms,
  getOneFilm,
  createOneFilm,
  updateOneFilm,
} from "../controllers/filmController.js";
import reviewRouter from "../routes/reviewRoutes.js";

const router = express.Router();

router.route("/").get(getFilms).post(createOneFilm);

router.route("/:id").get(getOneFilm).patch(updateOneFilm);

// nested route for each review for each film
router.use("/:filmId/reviews", reviewRouter);

export default router;
