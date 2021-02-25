import React from "react";
import { useHistory } from "react-router-dom";

const AdminEditGroup = () => {
  const history = useHistory();

  return (
    <>
      <button
        className="editBtn mr-10"
        onClick={() => history.push("/admin/films")}
      >
        Edit films
      </button>
      <button
        className="editBtn mr-10"
        onClick={() => history.push("/admin/reviews")}
      >
        Edit Reviews
      </button>
      <button className="editBtn" onClick={() => history.push("/admin/users")}>
        Edit Users
      </button>
    </>
  );
};

export default AdminEditGroup;
