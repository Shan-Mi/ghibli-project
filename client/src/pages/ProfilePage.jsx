import React, { useContext, useState, useEffect, useRef } from "react";
import { GhibliContext } from "../context/GlobalContext";
import {
  updateUser,
  updatePassword,
  getErrorMessage,
  getOneUser,
} from "../api";
import { imgURL } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = useContext(GhibliContext);
  const [avatar, setAvatar] = useState();
  const currPsw = useRef();
  const psw = useRef();
  const pswConfirm = useRef();
  const [isAdmin, setIsAdmin] = useState(false);
  // TODO: to remove previous image url from db

  useEffect(() => {
    setAvatar(`${imgURL}${user.photo}`);
  }, [user]);

  useEffect(() => {
    getOneUser(user._id).then((res) =>
      setIsAdmin(res.data.data.user.role === "admin")
    );
  }, [user._id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let form = new FormData();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const [photo] = document.querySelector("#photo").files;
      form.append("name", name);
      form.append("email", email);
      form.append("photo", photo);
      const { data } = await updateUser(form);
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // now we should remove the previous avatar from our db
      // use fs.unlink() async one to do the work
    } catch (e) {
      console.error(e.response);
    }
  };

  const handleChangePsw = async (e) => {
    e.preventDefault();
    const payload = {
      passwordCurrent: currPsw.current?.value,
      password: psw.current?.value,
      passwordConfirm: pswConfirm.current?.value,
    };
    try {
      const result = await updatePassword(payload);
      console.log(result);
      notifySuccess("Profile information saved successfully");
    } catch (e) {
      console.error(e.response);

      getErrorMessage(e)
        .split(",")
        .map((err) => notifyError(err));
    }
  };

  const handleImageLoad = () => {
    console.log("image loaded successfully");
  };

  const handleImageError = () => {
    console.log("something went wrong");
    setAvatar(`${imgURL}default.jpg`);
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  return (
    <main className="px-20">
      <ToastContainer />
      <h1 className="font-Montserrat font-semibold text-2xl text-center py-5">
        Edit your profile
      </h1>

      {isAdmin && (
        <Link to="/admin" className="primaryBtn w-max bg-dark text-gray-50">
          Go to Admin Panel
        </Link>
      )}

      <h2 className="font-Amaranth text-xl mt-5 text-gray-800">
        Change avatar:
      </h2>

      <form className="pt-5 flex-col pb-10" onSubmit={handleSubmit}>
        <div className="flex-col ">
          <label className="block" htmlFor="name">
            Name:
          </label>
          <input
            className="profileInput pointer-events-none"
            id="name"
            type="text"
            name="name"
            defaultValue={user.name}
          />
        </div>
        <div>
          <label className="block" htmlFor="email">
            Email Address
          </label>
          <input
            className="profileInput pointer-events-none"
            id="email"
            type="text"
            name="email"
            defaultValue={user.email}
          />
        </div>

        <div>
          <div className="flex items-end mb-5">
            <img
              className="h-28 mr-5 rounded-full"
              alt="user"
              src={avatar}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <p>{user.photo}</p>
          </div>
          <input type="file" accept="image/*" id="photo" name="photo" />
        </div>

        <button type="submit" className="primaryBtn">
          Save Settings
        </button>
      </form>

      <hr className="mt-5" />
      <h2 className="font-Amaranth text-xl mt-5 text-gray-800">
        Change Password:
      </h2>
      <form className="pt-5 flex-col pb-10" onSubmit={handleChangePsw}>
        <div className="flex-col ">
          <label className="block" htmlFor="currPsw">
            Current Password
          </label>
          <input
            className="profileInput"
            id="currPsw"
            type="password"
            name="currPsw"
            ref={currPsw}
            autoComplete="on"
          />
        </div>
        <div className="flex-col">
          <label className="block" htmlFor="psw1">
            New Password
          </label>
          <input
            className="profileInput"
            id="psw1"
            type="password"
            name="psw1"
            ref={psw}
            autoComplete="on"
          />
        </div>
        <div>
          <label className="block" htmlFor="psw2">
            Confirm Password
          </label>
          <input
            className="profileInput"
            id="psw2"
            type="password"
            name="psw2"
            ref={pswConfirm}
            autoComplete="on"
          />
        </div>

        <button type="submit" className="primaryBtn">
          Update Password
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;
