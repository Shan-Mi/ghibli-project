import Film from "../models/filmModel.js";
import * as factory from "./handlerFactory.js";

export const getFilms = factory.getAll(Film);

export const getOneFilm = factory.getOne(Film);
