import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminFilmsList from "../components/AdminFilmsList";

const AdminFilmsPage = () => {
  // const films = JSON.parse(localStorage.getItem("films"));
  const [films, setFilms] = useState(JSON.parse(localStorage.getItem("films")));
  const [update, setUpdate] = useState(false);

  const history = useHistory();
  const handleGoback = () => {
    history.push("/admin");
  };

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
    <div className="min-h-fullHeight flex justify-center mt-5 relative">
      <button
        className="absolute bg-primary -top-3 left-10 transform transition duration-250 hover:scale-110 px-5 py-2 border-t-4 border-r-4 rounded-md text-gray-50"
        onClick={handleGoback}
      >
        Go back
      </button>
      <table className="table-fixed w-11/12 font-Montserrat">
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
          {films && films.map((film) => <AdminFilmsList film={film} />)}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFilmsPage;
