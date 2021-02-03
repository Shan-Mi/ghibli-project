import React from "react";
import { Link } from "react-router-dom";

const FilmReview = ({ film }) => {
  const { imageCover, title, runtime, rating, slug } = film;

  return (
    <div class="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2 max-w-xl transform hover:scale-105 duration-200 ease-in-out">
      <div class="bg-white shadow-lg rounded-lg px-4 py-6 mx-4 my-4">
        <Link to={`/films/${slug}`}>
          <img
            class="mx-auto bg-gray-200 rounded-md"
            src="https://images.unsplash.com/photo-1611500730105-02d129cd71f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
            alt={title}
          />
          <h2 className="text-xl h-20 pt-8 text-center text-gray-700 capitalize p-3 font-Montserrat">
            {title}
          </h2>
        </Link>

        <div class="flex justify-center mt-4">
          <div class="rounded-sm h-8  px-4 bg-gray-200 mr-2 flex items-center">
            {runtime}
          </div>
          <div class="rounded-sm h-8 px-4 bg-green-300 flex items-center">
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
