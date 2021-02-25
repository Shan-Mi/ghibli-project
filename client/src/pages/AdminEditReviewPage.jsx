import React from "react";
import { useHistory } from "react-router-dom";

const AdminEditReviewPage = () => {
  const history = useHistory();
  const handleGoback = () => {
    history.push("/admin");
  };

  return (
    <div className="min-h-fullHeight flex justify-center mt-5 relative">
      <button
        className="absolute bg-primary -top-3 left-10 transform transition duration-250 hover:scale-110 px-5 py-2 border-t-4 border-r-4 rounded-md text-gray-50"
        onClick={handleGoback}
      >
        Go back
      </button>
      Admin edit review page
    </div>
  );
};

export default AdminEditReviewPage;
