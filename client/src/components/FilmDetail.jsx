import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fetchFilms } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";
import Review from "./Review";
import ReviewCreater from "./ReviewCreater";
import cx from "classnames";
// import { Skeleton } from "antd";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CircleLoading from "react-loadingg/lib/CircleLoading";
import { filmImgURL } from "../constants";
import { IoCloseCircleOutline } from "react-icons/io5";

import ResponsivePlayer from "./ResponsivePlayer";

const FilmDetail = () => {
  const { setFilms, status } = useContext(GhibliContext);
  const [film, setFilm] = useState({});
  const [openNewReview, setOpenNewReview] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    active: true,
    loading: true,
  });

  const [imageList, setImageList] = useState();
  const [isHidden, setIsHidden] = useState(true);

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
      setImageList(
        currentFilm.images.map((image) => ({
          original: `${filmImgURL}${image}`,
        }))
      );
      setLoadingStatus({ ...loadingStatus, loading: false });
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

  const closeOverlay = () => {
    setIsHidden(true);
  };

  return (
    <div className="px-10 min-h-fullHeight">
      {loadingStatus.loading ? (
        <CircleLoading />
      ) : (
        <div className="relative">
          <h1 className="text-3xl text-center font-Montserrat py-10 font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-justify font-Montserrat pb-5">{description}</p>

          <button
            className="px-5 py-1 rounded-md bg-primary font-Montserrat font-semibold"
            onClick={() => setIsHidden(false)}
          >
            Watch trailer
          </button>

          <div
            className={cx(
              "bg-black fixed top-0 left-0 bottom-0 right-0 overflow-hidden z-50 flex items-center justify-center opacity-100 bg-opacity-90",
              isHidden && "hidden"
            )}
            onClick={closeOverlay}
          >
            <button
              className="text-red-50 text-2xl absolute top-10 right-10"
              onClick={closeOverlay}
            >
              <IoCloseCircleOutline className="text-3xl transform hover:scale-110 duration-150 ease-in-out" />
            </button>
            <ResponsivePlayer className="w-80" trailer={trailer} />
          </div>

          <div className="xs:flex-col items-center mt-5 justify-between w-full max-w-screen-xl m-auto lg:flex">
            {imageList && (
              <ImageGallery
                items={imageList}
                showThumbnails={false}
                additionalClass="imgGalaryStyle"
                lazyLoad={true}
              />
            )}
            <div className="flex-col justify-center items-center md:flex md:mt-10">
              <p className="filmInfo">
                Rating: <span className="font-normal">{rating}</span>
              </p>
              <p className="filmInfo">
                Released At:
                <span className="font-normal">
                  {new Date(releasedDate).toLocaleDateString()}
                </span>
              </p>
              <p className="filmInfo">
                Director: <span className="font-normal">{directors}</span>
              </p>
              <p className="filmInfo">
                Runtime: <span className="font-normal">{runtime}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <hr className="mt-10" />

      <button
        onClick={handleOpenNewReview}
        className={cx(
          "primaryBtn",
          !status.isLoggedIn && "hidden",
          loadingStatus.loading && "hidden"
        )}
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

      {!status.isLoggedIn && (
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
