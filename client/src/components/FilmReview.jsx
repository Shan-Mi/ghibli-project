import React, { useState } from "react";
import { Link } from "react-router-dom";
import { filmImgURL } from "../constants";

const FilmReview = ({ film }) => {
  const { imageCover, title, runtime, rating, slug } = film;
  const [image, setImage] = useState(`${filmImgURL}${imageCover}`);

  return (
    <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2 max-w-xl transform hover:scale-105 duration-200 ease-in-out">
      <div className="bg-white shadow-lg rounded-lg px-4 py-6 mx-4 my-4">
        <Link to={`/films/${slug}`}>
          <img
            className="mx-auto bg-gray-200 rounded-md sm:object-fill sm:h-auto sm:w-auto
            md:h-128 md:w-full md:object-cover md:object-center
            lg:object-cover lg:h-128 lg:w-full lg:object-center"
            onError={() => setImage(`${filmImgURL}default.png`)}
            src={image}
            alt={title}
          />
          <h2 className="text-xl h-20 pt-8 text-center text-gray-700 capitalize p-3 font-Montserrat">
            {title}
          </h2>
        </Link>

        <div className="flex justify-center mt-4">
          <div className="rounded-sm h-8  px-4 bg-gray-200 mr-2 flex items-center">
            {runtime}
          </div>
          <div className="rounded-sm h-8 px-4 bg-green-300 flex items-center">
            Rating: {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmReview;
/* 

 const {
        data: { data: films },
      } = await fetchFilms();
      const { films: filmsData } = films;
      setFilms(filmsData);*/
