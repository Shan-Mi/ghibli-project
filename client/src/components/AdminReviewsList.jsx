import React from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GenerateConfirmUI } from "../utilities";
import { deleteReviewByAdmin } from "../api";

const AdminReviewsList = ({ review, setIsDeleted,isDeleted }) => {
  const handleDeleteReview = async () => {
    try {
      const text = "You want to delete this review?";
      const action = async () => {
        await deleteReviewByAdmin(review._id);
        setIsDeleted(!isDeleted);
      };
      GenerateConfirmUI(text, action);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="text-center">{review.title}</td>
      <td className="text-center">{review.createdAt}</td>
      <td className="text-center">{review.user.name}</td>
      <td className="text-center">{review.film.title}</td>
      <td className="text-center flex justify-around">
        <Link
          to={{
            pathname: `/admin/reviews/${review._id}/edit`,
            filmProps: { review },
          }}
          className="primaryBtn my-3 ml-0 flex items-center"
        >
          <BiEdit className="m-auto" />
        </Link>
        {/* <button className="editBtn">Edit</button> */}
        <button
          className="primaryBtn my-3 ml-0 bg-indigo-300"
          onClick={handleDeleteReview}
        >
          <RiDeleteBin5Fill className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AdminReviewsList;
