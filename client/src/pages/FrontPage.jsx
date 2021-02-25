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
      localStorage.setItem("films", JSON.stringify(filmsData));
    };
    getFilms();
  }, [setFilms]);

  return (
    <main className="flex-grow flex justify-center items-center">
      <div className="mx-auto px-4 sm:px-8 py-2 text-center">
        <div className="grid grid-cols-6 gap-4 items-start mt-8 mx-auto px-8 max-w-7xl">
          {films.map((film, index) => (
            <FilmReview film={film} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FrontPage;
