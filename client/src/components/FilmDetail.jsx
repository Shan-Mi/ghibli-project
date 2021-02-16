import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilms } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";
import ReactPlayer from "react-player";

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

  const editContent = () => {
    console.log("tada...");
  };

  return (
    <div className="px-10 ">
      <div>
        <h1 className="text-3xl text-center font-Montserrat py-10 font-bold text-gray-800">
          {title}
        </h1>
        <p className="text-justify font-Montserrat pb-5">{description}</p>
        <p>{rating}</p>
        <p>{releasedDate}</p>

        <ReactPlayer url={trailer} />

        <p>{directors}</p>
        <p>{runtime}</p>
      </div>

      <hr className="mt-10" />

      <div className="py-20">
        {reviews &&
          reviews.map((review, index) => {
            return (
              <div
                key={`film-review-${index}`}
                className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-md"
              >
                <input
                  className=" bg-gray-100 border border-gray-300 p-2 mb-4 outline-none rounded-md"
                  placeholder="Titles"
                  type="text"
                  defaultValue={review.title}
                />
                <input
                  className=" bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none rounded-md hidden"
                  placeholder="Describe everything about this post here"
                  type="text"
                  defaultValue={review.content}
                />
                <p>{review.content}</p>
                <button
                  className="px-3 py-1 bg-indigo-300"
                  onClick={editContent}
                >
                  Edit
                </button>
                <p>{review?.user?.name}</p>
                <p>{review.createdAt}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FilmDetail;
