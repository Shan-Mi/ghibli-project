import React from "react";
import AdminFilmsList from "../components/AdminFilmsList";

const AdminFilmsReviewPage = () => {
  const films = JSON.parse(localStorage.getItem("films"));

  return (
    <div className=" flex justify-center mt-5">
      <table className="table-fixed w-11/12 font-Montserrat">
        <thead>
          <tr className="text-xl h-20">
            <th className="w-6/12 ">Title</th>
            <th className="w-4/12">CreatedAt</th>
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

export default AdminFilmsReviewPage;
