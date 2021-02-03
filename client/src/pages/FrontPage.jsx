import React, { useContext, useEffect } from "react";
import { fetchFilms } from "../api";
import FilmReview from "../components/FilmReview";
import { GhibliContext } from "../context/GlobalContext";


// Here comes films reviews part.
const FrontPage = () => {
  const { films, setFilms } = useContext(GhibliContext);

  useEffect(() => {
    const getFilms = async () => {
      const {
        data: { data: films },
      } = await fetchFilms();
      const filmsData = films.films;
      setFilms(filmsData);
    };
    getFilms();
  }, [setFilms]);

  return (
    <div className="flex flex-wrap justify-around">
      {films.map((film, index) => (
        <div key={index}>
          <FilmReview film={film} />
        </div>
      ))}
    </div>
  );
};

export default FrontPage;
