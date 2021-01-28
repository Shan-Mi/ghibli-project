import express from "express";
import { getFilms, getOneFilm } from "../controllers/filmController.js";
import reviewRouter from "../routes/reviewRoutes.js";

const router = express.Router();

router.get("/", getFilms);
router.get("/:id", getOneFilm);

router.use("/:id/reviews", reviewRouter);

export default router;
