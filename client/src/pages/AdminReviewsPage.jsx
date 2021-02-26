import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllReviews } from "../api";
import AdminEditGroup from "../components/AdminEditGroup";
import AdminGoBackBtn from "../components/AdminGoBackBtn";
import AdminReviewsList from "../components/AdminReviewsList";
import CircleLoading from "react-loadingg/lib/CircleLoading";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState();
  const [update, setUpdate] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  useEffect(() => {
    if (user?.role !== "admin") {
      history.push("/");
    }
  }, []);
  
  useEffect(() => {
    getAllReviews().then((res) => {
      setReviews(res.data.data.reviews);
      setIsloading(false);
    });
  }, [isDeleted]);

  const sortBy = (query) => {
    const newQuery = query.split(".");

    const nullUserReview = reviews.filter((review) => review.user === null);
    const filteredBody = reviews.filter((review) => review.user !== null);

    if (newQuery.length > 1) {
      // we know in our condition, max length === 2
      if (update) {
        setReviews([
          ...nullUserReview,
          ...filteredBody.sort((a, b) =>
            a[newQuery[0]][newQuery[1]].localeCompare(
              b[newQuery[0]][newQuery[1]]
            )
          ),
        ]);
      } else {
        setReviews([
          ...filteredBody.sort((b, a) =>
            a[newQuery[0]][newQuery[1]].localeCompare(
              b[newQuery[0]][newQuery[1]]
            )
          ),
          ...nullUserReview,
        ]);
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

      {isLoading ? (
        <CircleLoading />
      ) : (
        <table className="table-fixed w-11/12 font-Montserrat">
          <thead>
            <tr className="text-xl h-20">
              <th
                onClick={() => sortBy("title")}
                className="w-6/12 cursor-pointer adminTitleHover"
              >
                Title
              </th>
              <th
                onClick={() => sortBy("createdAt")}
                className="w-4/12 cursor-pointer adminTitleHover"
              >
                Created At
              </th>
              <th
                onClick={() => sortBy("user.name")}
                className="w-4/12 cursor-pointer adminTitleHover"
              >
                Created By
              </th>
              <th
                onClick={() => sortBy("film.title")}
                className="w-4/12 cursor-pointer adminTitleHover"
              >
                Film
              </th>
              <th className="w-2/12">Edit</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review, index) => (
                <AdminReviewsList
                  review={review}
                  key={`review-${index}`}
                  setIsDeleted={setIsDeleted}
                  isDeleted={isDeleted}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReviewsPage;
