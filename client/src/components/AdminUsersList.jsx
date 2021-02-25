import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AdminUsersList = ({ user }) => {
  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="text-center">{user.name}</td>
      <td className="text-center">
        {user.active ? "Active" : "Inactive".toLocaleUpperCase()}
      </td>
      <td className="text-center">
        <button className="editBtn">
          <RiDeleteBin5Fill className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AdminUsersList;
