import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { GenerateConfirmUI } from "../utilities";
import { deleteFilmByAdmin } from "../api";

const AdminFilmsList = ({ film, setIsDeleted, isDeleted }) => {
  const history = useHistory();

  const handleEditFilm = () => {
    history.push(`/admin/films/${film.slug}/edit`);
  };

  const handleDeleteFilm = async () => {
    try {
      // console.log(user._id);
      const text = "You want to delete this film?";
      const action = async () => {
        await deleteFilmByAdmin(film._id);
        setIsDeleted(!isDeleted);
      };
      GenerateConfirmUI(text, action);
      // const res = await deleteUserByAdmin(user._id)
    } catch (e) {
      console.error(e.response);
    }
  };

  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="pl-5">{film.title}</td>
      <td className="text-center">
        {new Date(film.createdAt).toLocaleString()}
      </td>
      <td className="flex justify-evenly">
        <Link
          to={{
            pathname: `/admin/films/${film.slug}/edit`,
            filmProps: { film },
          }}
          className="primaryBtn my-3 ml-0 flex items-center"
          onClick={handleEditFilm}
        >
          <BiEdit className="m-auto" />
        </Link>
        <button
          className="primaryBtn my-3 ml-0 bg-indigo-300"
          onClick={handleDeleteFilm}
        >
          <RiDeleteBin5Fill className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AdminFilmsList;
