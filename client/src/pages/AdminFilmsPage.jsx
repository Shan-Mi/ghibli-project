import React, { useEffect, useState } from "react";
import AdminEditGroup from "../components/AdminEditGroup";
import AdminFilmsList from "../components/AdminFilmsList";
import AdminGoBackBtn from "../components/AdminGoBackBtn";

const AdminFilmsPage = () => {
  const [films, setFilms] = useState(JSON.parse(localStorage.getItem("films")));
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setFilms(films);
  }, [films]);

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
      <h1 className="adminTitle">Edit Films</h1>
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
              <AdminFilmsList film={film} key={`film-${index}`} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFilmsPage;
