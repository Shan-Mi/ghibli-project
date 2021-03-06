import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers } from "../api";
import AdminEditGroup from "../components/AdminEditGroup";
import AdminGoBackBtn from "../components/AdminGoBackBtn";
import AdminUsersList from "../components/AdminUsersList";
import CircleLoading from "react-loadingg/lib/CircleLoading";

const AdminUsersPage = () => {
  const [users, setUsers] = useState();
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
    setUsers(users);
  }, [users]);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data.data.users);
      setIsloading(false);
    });
  }, [isDeleted]);

  const sortByStatus = () => {
    if (update) {
      users.sort((a, b) =>
        a.active.toString().localeCompare(b.active.toString())
      );
    } else {
      users.sort((b, a) =>
        a.active.toString().localeCompare(b.active.toString())
      );
    }
    setUpdate(!update);
  };

  const sortBy = (query) => {
    if (update) {
      users.sort((a, b) => a[query].localeCompare(b[query]));
    } else {
      users.sort((b, a) => a[query].localeCompare(b[query]));
    }
    setUpdate(!update);
  };

  return (
    <div className="min-h-fullHeight flex-col justify-center mt-5 relative">
      <div className="flex justify-center">
        <AdminGoBackBtn marginR="mr-20" location="/admin" />
        <AdminEditGroup />
      </div>
      <h1 className="adminTitle">Edit Users</h1>

      {isLoading ? (
        <CircleLoading />
      ) : (
        <table className="table-fixed w-11/12 font-Montserrat">
          <thead>
            <tr className="text-xl h-20">
              <th
                className="w-6/12 cursor-pointer adminTitleHover"
                onClick={() => sortBy("name")}
              >
                User's Name
              </th>
              <th
                className="w-4/12 cursor-pointer adminTitleHover"
                onClick={() => sortBy("email")}
              >
                Email
              </th>
              <th
                className="w-4/12 cursor-pointer adminTitleHover"
                onClick={sortByStatus}
              >
                Account Status
              </th>
              <th className="w-2/12">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <AdminUsersList
                  user={user}
                  key={`user-${index}`}
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

export default AdminUsersPage;
