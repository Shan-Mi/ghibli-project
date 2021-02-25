import React from "react";
import { BiEdit } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";

const AdminFilmsList = ({ film }) => {
  const history = useHistory();

  const handleEditFilm = () => {
    history.push(`/admin/films/${film.slug}/edit`);
  };

  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="">{film.title}</td>
      <td className="text-center">
        {new Date(film.createdAt).toLocaleString()}
      </td>
      <td className="">
        <Link
          to={{
            pathname: `/admin/films/${film.slug}/edit`,
            filmProps: { film: film },
          }}
          className="primaryBtn my-3"
          onClick={handleEditFilm}
        >
          <BiEdit className="m-auto" />
        </Link>
      </td>
    </tr>
  );
};

export default AdminFilmsList;
