import React from "react";

const AdminReviewsList = ({ review }) => {
  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="text-center">{review.title}</td>
      <td className="text-center">{review.createdAt}</td>
      <td className="text-center">{review.user.name}</td>
      <td className="text-center">{review.film.title}</td>
      <td className="text-center">
        <button className="editBtn">Edit</button>
      </td>
    </tr>
  );
};

export default AdminReviewsList;
