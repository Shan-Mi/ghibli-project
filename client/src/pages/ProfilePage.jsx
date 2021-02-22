import React, { useContext, useState, useEffect, useRef } from "react";
import { GhibliContext } from "../context/GlobalContext";
import { updateUser, updatePassword } from "../api";
import { imgURL } from "../constants";
import ErrorMessage from "../components/ErrorMessage";

const ProfilePage = () => {
  const {
    user: { name, photo, email },
    setUser,
    setError,
  } = useContext(GhibliContext);

  const [avatar, setAvatar] = useState();
  const currPsw = useRef();
  const psw = useRef();
  const pswConfirm = useRef();
  // TODO: to remove previous image url from db
  // const [prevAvatar, setPrevAvatar] = useState();

  useEffect(() => {
    setAvatar(`${imgURL}${photo}`);
  }, [photo]);

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
      console.log(e);
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
    } catch (e) {
      console.error(e.response);
      const {
        data: { message },
      } = e.response;
      setError({
        hidden: false,
        message: message,
      });
    }
  };

  return (
    <div className="">
      <ErrorMessage />
      <form
        className="pt-5 flex-col px-20 pb-10 border-b border-light"
        onSubmit={handleSubmit}
      >
        <div className="flex-col ">
          <label className="block" htmlFor="name">
            Name:
          </label>
          <input
            className="profileInput pointer-events-none"
            id="name"
            type="text"
            name="name"
            value={name}
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
            value={email}
          />
        </div>
        <div>
          <img className="h-28" alt="user" src={avatar} />
          <p>{photo}</p>
          <input type="file" accept="image/*" id="photo" name="photo" />
        </div>

        <button type="submit" className="primaryBtn">
          Save Settings
        </button>
      </form>

      <form className="pt-5 flex-col px-20 pb-10" onSubmit={handleChangePsw}>
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
          />
        </div>

        <button type="submit" className="primaryBtn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
