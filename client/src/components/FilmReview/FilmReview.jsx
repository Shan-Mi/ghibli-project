import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styled";

const FilmReview = ({ film }) => {
  const { imageCover, title, runtime, slug } = film;
  return (
    <S.Carousel>
      <Link to={`/films/${slug}`}>
       {/*  <S.Image src={imageCover} alt={title} /> */}
        <S.Caption>
          <h2>{title}</h2>
        </S.Caption>
        <h3>{runtime}</h3>
      </Link>
    </S.Carousel>
  );
};

export default FilmReview;
/* 

 const {
        data: { data: films },
      } = await fetchFilms();
      const { films: filmsData } = films;
      setFilms(filmsData);*/
