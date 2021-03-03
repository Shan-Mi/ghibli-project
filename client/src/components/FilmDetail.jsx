import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fetchFilms } from "../api";
import { GhibliContext } from "../context/GlobalContext";
import { getOneFilm } from "../utilities";
import ReactPlayer from "react-player";
import Review from "./Review";
import ReviewCreater from "./ReviewCreater";
import cx from "classnames";
// import { Skeleton } from "antd";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CircleLoading from "react-loadingg/lib/CircleLoading";
import { filmImgURL } from "../constants";

const FilmDetail = () => {
  const { setFilms, status } = useContext(GhibliContext);
  const [film, setFilm] = useState({});
  const [openNewReview, setOpenNewReview] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    active: true,
    loading: true,
  });

  const [imageList, setImageList] = useState();

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
      // console.log(currentFilm.images);
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

  console.log(imageList);
  // const imageList = images.map((image) => `${filmImgURL}${image}`);
  // console.log(imageList)

  const handleOpenNewReview = () => {
    setOpenNewReview(true);
  };

  return (
    <div className="px-10 min-h-fullHeight">
      {loadingStatus.loading ? (
        <CircleLoading />
      ) : (
        <div>
          <h1 className="text-3xl text-center font-Montserrat py-10 font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-justify font-Montserrat pb-5">{description}</p>

          <div className="xs:flex-col items-center mt-5 justify-between w-full max-w-screen-xl m-auto lg:flex">
            <ReactPlayer
              url={trailer}
              className="max-w-max m-auto lg:m-0 md:max-w-full md:max-h-full"
            />
            <div className="flex-col justify-center items-center  md:flex md:mt-10">
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

      {imageList && <ImageGallery items={imageList} showThumbnails={false} />}

      <hr className="mt-10" />

      <button
        onClick={handleOpenNewReview}
        className={cx("primaryBtn", !status.isLoggedIn && "hidden")}
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
