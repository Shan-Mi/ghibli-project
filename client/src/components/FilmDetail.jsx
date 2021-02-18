import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fetchFilms } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";
import ReactPlayer from "react-player";
import Review from "./Review";
import ReviewCreater from "./ReviewCreater";
import ErrorMessage from "./ErrorMessage";
import cx from "classnames";

const FilmDetail = () => {
  const { setFilms, isLoggedIn } = useContext(GhibliContext);
  const [film, setFilm] = useState({});
  const [openNewReview, setOpenNewReview] = useState(false);
  // const [openEditReview, setOpenEditReview] = useState(false);
  const slug = useLocation().pathname.split("/")[2];
  const history = useHistory();

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
  }, [setFilms, slug, openNewReview]);

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

  const handleOpenNewReview = () => {
    setOpenNewReview(true);
  };

  return (
    <div className="px-10 ">
      <ErrorMessage />
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

      <button
        onClick={handleOpenNewReview}
        className={cx("primaryBtn", !isLoggedIn && "hidden")}
      >
        Share my story:
      </button>

      {openNewReview && <ReviewCreater setOpenNewReview={setOpenNewReview} />}

      <div className="pt-20">
        {reviews &&
          reviews.map((review, index) => {
            return <Review key={index} review={review} />;
          })}
      </div>

      {!isLoggedIn && (
        <button
          onClick={() => history.push("/register")}
          className="primaryBtn mb-10 mx-auto"
        >
          You need an account to leave a review:
        </button>
      )}
    </div>
  );
};

export default FilmDetail;
