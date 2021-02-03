import React from "react";
import { Link } from "react-router-dom";

const FilmReview = ({ film }) => {
  const { imageCover, title, runtime, slug } = film;

  return (
    <div className="grid py-20 px-10 place-items-center relative flex-grow">
      <div className="relative h-96 w-96">
        <div className="card bg-cyan-400 shadow-md inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform -rotate-12"></div>
        <div className="card bg-indigo-400 shadow-lg inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform -rotate-6"></div>
        <div className="card bg-pink-500 shadow-lg inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform rotate-6"></div>
        <div className="card bg-white transition shadow-xl w-96 h-96 rounded-3xl absolute bottom-0 z-10 grid place-items-center">
          <div className="card bg-white shadow-inner h-4/5 w-3/4 rounded-2xl overflow-hidden relative">
            <h1 className="shadow-md text-xl font-thin text-center text-gray-600 uppercase p-3">
              {title}
            </h1>
            <img
              src="https://images.unsplash.com/photo-1611500730105-02d129cd71f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
              alt=""
            />
            <Link
              to={`/films/${slug}`}
              className="card bg-gray-700 hover:bg-gray-600 transition text-white w-full h-1/6 absolute bottom-0 flex justify-center items-center"
            >
              Go to detail page
            </Link>
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
