import express from "express";
import { getFilms, getOneFilm } from "../controllers/filmController.js";
import reviewRouter from "../routes/reviewRoutes.js";

const router = express.Router();

router.get("/", getFilms);
router.get("/:filmId", getOneFilm);

router.use("/:filmId/reviews", reviewRouter);

export default router;
