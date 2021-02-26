import React, { useEffect, useState } from "react";
import { fetchFilms } from "../api";
import AdminEditGroup from "../components/AdminEditGroup";
import AdminFilmsList from "../components/AdminFilmsList";
import AdminGoBackBtn from "../components/AdminGoBackBtn";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import CircleLoading from "react-loadingg/lib/CircleLoading";

const AdminFilmsPage = () => {
  const [films, setFilms] = useState();
  const [update, setUpdate] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setFilms(films);
  }, [films]);

  useEffect(() => {
    fetchFilms().then((res) => {
      setFilms(res.data.data.films);
      setIsloading(false);
    });
  }, [isDeleted]);

  const sortBy = (query) => {
    if (update) {
      films.sort((a, b) => a[query].localeCompare(b[query]));
    } else {
      films.sort((b, a) => a[query].localeCompare(b[query]));
    }
    setUpdate(!update);
  };

  return (
    <div className="min-h-fullHeight flex-col justify-center mt-5 relative">
      <div className="flex justify-center">
        <AdminGoBackBtn marginR="mr-20" location="/admin" />
        <AdminEditGroup />
      </div>
      <div className="relative">
        <h1 className="adminTitle">Edit Films</h1>
        <Link
          className="absolute top-6 right-20 text-2xl text-dark flex items-center transform hover:text-blue-900 hover:scale-105  hover:text-opacity-40 duration-200 ease-in-out"
          to="/admin/films/create"
        >
          <IoMdAddCircleOutline className="mr-5" />
          <span className="font-thin font-Montserrat text-xl ">
            Add a new film
          </span>
        </Link>
      </div>

      {isLoading ? (
        <CircleLoading />
      ) : (
        <table className="table-fixed w-11/12 font-Montserrat mt-10 m-auto">
          <thead>
            <tr className="text-xl h-20">
              <th
                className="w-6/12 cursor-pointer"
                onClick={() => sortBy("title")}
              >
                Title
              </th>
              <th
                className="w-4/12 cursor-pointer"
                onClick={() => sortBy("createdAt")}
              >
                CreatedAt
              </th>
              <th className="w-2/12">Edit</th>
            </tr>
          </thead>
          <tbody>
            {films &&
              films.map((film, index) => (
                <AdminFilmsList
                  film={film}
                  key={`film-${index}`}
                  setIsDeleted={setIsDeleted}
                  isDeleted={isDeleted}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFilmsPage;
