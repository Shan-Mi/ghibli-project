import React, { useEffect, useState } from "react";
import { getAllReviews } from "../api";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState({});
  useEffect(() => {
    const res = getAllReviews()
      .then((response) => {
        setReviews(response.data.data.reviews);
      })
      .catch((e) => console.error(e.response));
  }, []);

  return <div>Here is all reviews.</div>;
};

export default AdminReviewsPage;
