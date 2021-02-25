import React, { useEffect, useState } from "react";
import { getAllReviews } from "../api";
import AdminEditGroup from "../components/AdminEditGroup";
import AdminGoBackBtn from "../components/AdminGoBackBtn";
import AdminReviewsList from "../components/AdminReviewsList";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getAllReviews()
      .then((res) => {
        // console.log(res.data.data.reviews);
        setReviews(res.data.data.reviews);
      })
      .catch((e) => console.error(e.response));
  }, []);

  const sortBy = (query) => {
    const newQuery = query.split(".");

    if (newQuery.length > 1) {
      // we know in our condition, max length === 2
      if (update) {
        reviews.sort((a, b) =>
          a[newQuery[0]][newQuery[1]].localeCompare(b[newQuery[0]][newQuery[1]])
        );
      } else {
        reviews.sort((b, a) =>
          a[newQuery[0]][newQuery[1]].localeCompare(b[newQuery[0]][newQuery[1]])
        );
      }
      setUpdate(!update);
      return;
    }

    if (update) {
      reviews.sort((a, b) => a[query].localeCompare(b[query]));
    } else {
      reviews.sort((b, a) => a[query].localeCompare(b[query]));
    }
    setUpdate(!update);
  };

  return (
    <div className="min-h-fullHeight flex-col justify-center mt-5 relative">
      <div className="flex justify-center">
        <AdminGoBackBtn marginR="mr-20" location="/admin" />
        <AdminEditGroup />
      </div>
      <h1 className="adminTitle">Edit Reviews</h1>

      <table className="table-fixed w-11/12 font-Montserrat">
        <thead>
          <tr className="text-xl h-20">
            <th
              onClick={() => sortBy("title")}
              className="w-6/12 cursor-pointer"
            >
              Title
            </th>
            <th
              onClick={() => sortBy("createdAt")}
              className="w-4/12 cursor-pointer"
            >
              Created At
            </th>
            <th
              onClick={() => sortBy("user.name")}
              className="w-4/12 cursor-pointer"
            >
              Created By
            </th>
            <th
              onClick={() => sortBy("film.title")}
              className="w-4/12 cursor-pointer"
            >
              Film
            </th>
            <th className="w-2/12 cursor-pointer">Edit</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((review, index) => (
              <AdminReviewsList review={review} key={`review-${index}`} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewsPage;
