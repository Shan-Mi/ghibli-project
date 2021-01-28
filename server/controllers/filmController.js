import Film from "../models/filmModel.js";
import * as factory from "./handlerFactory.js";

export const getFilms = factory.getAll(Film, 'films');

export const getOneFilm = factory.getOne(Film, 'films');
