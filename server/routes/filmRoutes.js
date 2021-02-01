import express from "express";
import { getFilms, getOneFilm } from "../controllers/filmController.js";
import reviewRouter from "../routes/reviewRoutes.js";

const router = express.Router();

router.get("/", getFilms);
router.get("/:id", getOneFilm);
// router.get("?title=[]")  -> use this one to search for one film. but maybe we can do that from frontend

// nested route for each review for each film
router.use("/:filmId/reviews", reviewRouter);

export default router;
