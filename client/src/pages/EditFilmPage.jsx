import React, { useState } from "react";

const EditFilmPage = (props) => {
  const [film, setFilm] = useState({
    ...props.location.filmProps,
    error: false,
  });

  return (
    <div className="px-20 h-fullHeight">
      <h1 className="font-Montserrat text-2xl text-center my-5">
        Edit film detail:
      </h1>
      <form className="flex-col">
        <div className="editDivStyle">
          <label className="editLabel" htmlFor="title">
            Title
          </label>
          <input
            className="editInput"
            name="title"
            type="text"
            id="title"
            value={film.film.title}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="film">
            Description:
          </label>
          <textarea
            className="h-50 w-10/12 p-5 border border-collapse"
            id="film"
            type="text"
            name="film"
            value={film.film.description}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="directors">
            Directors:
          </label>
          <input
            id="directors"
            type="text"
            name="directors"
            value={film.film.directors}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="imageCover">
            Cover Image:
          </label>
          <input
            id="imageCover"
            type="file"
            name="imageCover"
            value={film.film.coverImage}
          />
        </div>

        {/* <label htmlFor="images">Images:</label>
        <input id="image1" type="file" name="image1" value={film.images[0]} />
        <input id="image2" type="file" name="image2" value={film.images[1]} />
        <input id="image3" type="file" name="image3" value={film.images[2]} /> */}
        <div className="editDivStyle">
          <label className="editLabel" htmlFor="rating">
            Rating:
          </label>
          <input
            id="rating"
            type="text"
            name="rating"
            value={film.film.rating}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="releasedDate">
            Released Date:
          </label>
          <input
            id="releasedDate"
            type="text"
            name="releasedDate"
            value={film.film.releasedDate}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="runtime">
            Runtime:
          </label>
          <input
            id="runtime"
            type="text"
            name="runtime"
            value={film.film.runtime}
          />
        </div>

        <div className="editDivStyle">
          <label className="editLabel" htmlFor="trailer">
            Trailer:
          </label>
          <input
            id="trailer"
            type="text"
            name="trailer"
            value={film.film.trailer}
          />
        </div>

        <button type="submit" className="subBtn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditFilmPage;
