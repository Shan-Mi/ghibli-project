import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteUserByAdmin } from "../api";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GenerateConfirmUI } from "../utilities";

const AdminUsersList = ({ user, setIsDeleted, isDeleted }) => {
  const handleDeleteUser = async () => {
    try {
      // console.log(user._id);
      const text = "You want to delete this user?";
      const action = async () => {
        await deleteUserByAdmin(user._id);
        setIsDeleted(!isDeleted);
      };
      GenerateConfirmUI(text, action);
      // const res = await deleteUserByAdmin(user._id)
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <tr className="h-10 transform transition duration-300 hover:bg-red-50 ">
      <td className="text-center">{user.name}</td>
      <td className="text-center">{user.email}</td>
      <td className="text-center">
        {user.active ? "Active" : "Inactive".toLocaleUpperCase()}
      </td>
      <td className="text-center">
        <button className="editBtn" onClick={handleDeleteUser}>
          <RiDeleteBin5Fill className="cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default AdminUsersList;
