import React, { useContext, useState, useEffect } from "react";
import { GhibliContext } from "../context/GlobalContext";
import { updateUser } from "../api";
import { imgURL } from "../constants";

const ProfilePage = () => {
  const {
    user: { name, photo, email },
    setUser,
    token,
  } = useContext(GhibliContext);

  const [avatar, setAvatar] = useState();
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
      const { data } = await updateUser(form, token);
      setUser(data.data.user);
      // now we should remove the previous avatar from our db
      // use fs.unlink() async one to do the work
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className=" mt-5 flex-col px-20" onSubmit={handleSubmit}>
        <div className="flex-col ">
          <label className="block" htmlFor="name">
            Name:
          </label>
          <input
            className="p-3 bg-blue-100 rounded-md w-full my-3 pointer-events-none"
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
            className="p-3 bg-blue-100 rounded-md w-full my-3 pointer-events-none"
            id="email"
            type="text"
            name="email"
            value={email}
          />
        </div>
        <div>
          <img alt="user" src={avatar} />
          <input type="file" accept="image/*" id="photo" name="photo" />
          <label className="block" htmlFor="photo">
            Choose new photo
          </label>
        </div>

        <button
          type="submit"
          className="p-5 bg-green-300 rounded-md block ml-auto text-white font-bold"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
