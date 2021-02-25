import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers } from "../api";
import AdminUsersList from "../components/AdminUsersList";

const AdminUsersPage = () => {
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data.data.users));
  }, []);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  const sortByName = () => {
    if (!update) {
      users.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      users.sort((b, a) => a.name.localeCompare(b.name));
    }
    setUpdate(!update);
  };
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
      <table className="table-fixed w-11/12 font-Montserrat">
        <thead>
          <tr className="text-xl h-20">
            <th className="w-6/12 cursor-pointer" onClick={sortByName}>
              User's Name
            </th>
            <th className="w-4/12 cursor-pointer" onClick={sortByStatus}>
              Account Status
            </th>
            <th className="w-2/12">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <AdminUsersList user={user} key={`user-${index}`} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
