import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
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
      <td className="flex justify-evenly">
        <Link
          to={{
            pathname: `/admin/films/${film.slug}/edit`,
            filmProps: { film: film },
          }}
          className="primaryBtn my-3 ml-0 flex items-center"
          onClick={handleEditFilm}
        >
          <BiEdit className="m-auto" />
        </Link>
        <button className="primaryBtn my-3 ml-0 bg-indigo-300">
          <RiDeleteBin5Fill className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AdminFilmsList;
