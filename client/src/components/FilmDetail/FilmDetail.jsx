import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilms } from "../../api";
import { GhibliContext } from "../../context/GlobalContext";
import { getOneFilm } from "../../utilities";
import * as S from "./styled";

const FilmDetail = () => {
  const { films, setFilms } = useContext(GhibliContext);
  const [film, setFilm] = useState({});
  const slug = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const getFilms = async () => {
      const {
        data: { data: films },
      } = await fetchFilms();
      const filmsData = films.films;
      setFilms(filmsData);
      const [currentFilm] = getOneFilm(slug, films.films);
      setFilm(currentFilm);
    };
    // TODO: NEED TO avoid multiple fetching data, if data is in context, we don't need to fetch from api.
    getFilms();
    // console.log("you should run");
  }, []);

  // console.log(films);

  const {
    description,
    directors,
    images,
    rating,
    releasedDate,
    reviews,
    runtime,
    title,
    trailer,
  } = film;
  // console.log(film);

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{rating}</p>
      <p>{releasedDate}</p>

      <p>{trailer}</p>
      <p>{directors}</p>
      <p>{runtime}</p>
    </div>
  );
};

export default FilmDetail;
