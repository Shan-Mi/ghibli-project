import React from "react";
import { Link } from "react-router-dom";

const AdminReviewsList = ({ review }) => {
  const handleEditReview = () => {
    console.log("edit review...");
  };
  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="text-center">{review.title}</td>
      <td className="text-center">{review.createdAt}</td>
      <td className="text-center">{review.user.name}</td>
      <td className="text-center">{review.film.title}</td>
      <td className="text-center">
        <Link
          to={{
            pathname: `/admin/reviews/${review._id}/edit`,
            filmProps: { review },
          }}
          className="primaryBtn my-3"
        >
          Edit
        </Link>
        {/* <button className="editBtn">Edit</button> */}
      </td>
    </tr>
  );
};

export default AdminReviewsList;
