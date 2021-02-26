import React, { useEffect } from "react";
import CircleLoading from "react-loadingg/lib/CircleLoading";
import { useHistory } from "react-router-dom";
import AdminEditBtns from "../components/AdminEditGroup";

const AdminPage = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role !== "admin") {
      history.push("/");
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="min-h-fullHeight flex-col justify-center ">
          <h1 className="text-center pt-10 font-Amaranth text-2xl">
            Welcome: {user.name.toUpperCase()}
          </h1>

          <p className="text-center">
            Today is {new Date().toLocaleDateString()}
          </p>
          <div className="flex justify-center h-2/4 items-center">
            <AdminEditBtns />
          </div>
        </div>
      ) : (
        <CircleLoading />
      )}
    </>
  );
};

export default AdminPage;
