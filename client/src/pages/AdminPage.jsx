import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AdminPage = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.role !== "admin") {
      history.push("/");
    }
  }, []);

  return (
    <div className="h-fullHeight flex-col justify-center ">
      <h1 className="text-center pt-10 font-Amaranth text-2xl">
        Welcome: {user.name.toUpperCase()}
      </h1>
      <p className="text-center">Today is {new Date().toLocaleDateString()}</p>
      <div className="flex justify-center h-2/4 items-center">
        <button
          className="editBtn mr-10"
          onClick={() => history.push("/admin/films")}
        >
          Edit films
        </button>
        <button
          className="editBtn"
          onClick={() => history.push("/admin/reviews")}
        >
          Edit Reviews
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
