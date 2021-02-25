import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getErrorMessage, updateFilm } from "../api";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

const AdminEditFilmPage = (props) => {
  const [film, setFilm] = useState({
    ...props.location.filmProps.film,
  });
  const [textLength, setTextLength] = useState(film.description.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateFilm(film, film._id);
      console.log(data);
      notifySuccess("Film information saved successfully");
    } catch (e) {
      console.error(e.response.data);
      getErrorMessage(e)
        .split(",")
        .map((err) => notifyError(err));
    }
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  return (
    <div className="px-20 min-h-fullHeight relative">
      <Link
        className="w-max flex items-center text-xl bg-gray-200 px-3 py-1 rounded-full sticky top-0 -ml-10 transform hover:bg-gray-300 delay-200 ease-in-out"
        to="/admin/films"
      >
        <TiArrowBack className="text-primary" />
        <span className="text-primary">Go back</span>
      </Link>

      <h1 className="font-Montserrat text-2xl text-center my-5">
        Edit film detail:
      </h1>

      <ToastContainer />
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="title">
            Title
          </label>
          <input
            className="editInput"
            name="title"
            type="text"
            id="title"
            value={film.title}
            onChange={(e) => setFilm({ ...film, title: e.target?.value })}
          />
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="film">
            Description:
          </label>
          <div className="flex-col w-full">
            <textarea
              className="h-52 w-full px-5 py-2 rounded-md border border-collapse"
              id="film"
              type="text"
              name="film"
              value={film.description}
              onChange={(e) => {
                setFilm({ ...film, description: e.target?.value });
                setTextLength(e.target?.value.length);
              }}
            />
            <div className="icons flex text-gray-500 m-2">
              <div className="count ml-auto text-gray-400 text-xs font-semibold">
                {textLength}/1200
              </div>
            </div>
          </div>
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="directors">
            Directors:
          </label>
          <input
            className="editInput"
            id="directors"
            type="text"
            name="directors"
            value={film.directors}
            onChange={(e) => setFilm({ ...film, directors: e.target?.value })}
          />
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="imageCover">
            Cover Image:
          </label>
          <input
            id="imageCover"
            type="file"
            name="imageCover"
            value={film.coverImage}
          />
        </div>

        {/* <label htmlFor="images">Images:</label>
        <input id="image1" type="file" name="image1" value={film.images[0]} />
        <input id="image2" type="file" name="image2" value={film.images[1]} />
        <input id="image3" type="file" name="image3" value={film.images[2]} /> */}
        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="rating">
            Rating:
          </label>
          <input
            className="editInput"
            id="rating"
            type="text"
            name="rating"
            value={film.rating}
            onChange={(e) => setFilm({ ...film, rating: e.target?.value })}
          />
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="releasedDate">
            Released Date:
          </label>
          <input
            className="editInput"
            id="releasedDate"
            type="text"
            name="releasedDate"
            value={film.releasedDate}
            onChange={(e) =>
              setFilm({ ...film, releasedDate: e.target?.value })
            }
          />
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="runtime">
            Runtime:
          </label>
          <input
            className="editInput"
            id="runtime"
            type="text"
            name="runtime"
            value={film.runtime}
            onChange={(e) => setFilm({ ...film, runtime: e.target?.value })}
          />
        </div>

        <div className="editDivStyle">
          <label className="filmEditLabel" htmlFor="trailer">
            Trailer:
          </label>
          <input
            className="editInput"
            id="trailer"
            type="text"
            name="trailer"
            value={film.trailer}
            onChange={(e) => setFilm({ ...film, trailer: e.target?.value })}
          />
        </div>

        <button type="submit" className="subBtn mb-10">
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminEditFilmPage;
