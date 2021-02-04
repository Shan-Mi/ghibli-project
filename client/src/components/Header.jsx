import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import GhibliLogo from "../assets/GhibliLogo.svg";
import { GhibliContext } from "../context/GlobalContext";
import { logout } from "../api";

const Header = () => {
  const { user } = useContext(GhibliContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const res = Object.keys(user).length ? true : false;
    setIsLoggedIn(res);
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
      <Link to="/" className="p-2 mr-4 inline-flex items-center">
        <img src={GhibliLogo} alt="Ghibli Studio Logo" />
        <span className="text-xl text-white font-bold uppercase tracking-wide self-end">
          Ghibli Project
        </span>
      </Link>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <FiMenu />
      </button>
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link
            to="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Home</span>
          </Link>

          <Link
            to="/"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>About</span>
          </Link>

          {/* <Link
            to="/films"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Films</span>
          </Link> */}

          <Link
            to="/profile"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Profile</span>
          </Link>

          <Link
            to="/register"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Register</span>
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span>Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;