import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteUserByAdmin } from "../api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminUsersList = ({ user, setIsDeleted }) => {
  const handleDeleteUser = async () => {
    try {
      // console.log(user._id);
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1 className="text-3xl font-Montserrat font-bold mb-5">
                Are you sure?
              </h1>
              <p className="flex-1">You want to delete this user?</p>
              <div className="flex justify-between flex-1">
                <div className="border-white border-solid border-2 w-2/5 p-3 m-2.5">
                  <button className="" onClick={onClose}>
                    No
                  </button>
                </div>
                <div className="border-white border-solid border-2 w-2/5 p-3 m-2.5">
                  <button
                    onClick={async () => {
                      await deleteUserByAdmin(user._id);
                      setIsDeleted(true)
                      onClose();
                    }}
                  >
                    Yes, Delete it!
                  </button>
                </div>
              </div>
            </div>
          );
        },
      });

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
