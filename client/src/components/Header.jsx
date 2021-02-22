import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import { FiMenu } from "react-icons/fi";
import GhibliLogo from "../assets/GhibliLogo.svg";
import { GhibliContext } from "../context/GlobalContext";
import { logout } from "../api";

const Header = () => {
  const { user, setUser, status, setStatus } = useContext(GhibliContext);

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const res = Object.keys(user).length ? true : false;
    // setIsLoggedIn(res);
    setStatus({ ...status, isLoggedIn: res });
  }, [setStatus, user]);

  const handleLogout = () => {
    logout();
    // setIsLoggedIn(false);
    setStatus({ ...status, isLoggedIn: false });
    setUser({});
    localStorage.removeItem("user");
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
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        <FiMenu />
      </button>
      <div
        className={cx(
          "top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto",
          isHidden && "hidden"
        )}
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link
            to="/"
            className="navBar"
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          >
            <span>Home</span>
          </Link>

          <Link
            to="/about"
            className="navBar"
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          >
            <span>About</span>
          </Link>

          {status.isLoggedIn && (
            <Link
              to="/profile"
              className="navBar"
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              <span>Profile</span>
            </Link>
          )}

          {!status.isLoggedIn && (
            <Link
              to="/register"
              className="navBar"
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              <span>Register</span>
            </Link>
          )}

          {!status.isLoggedIn ? (
            <Link
              to="/login"
              className="navBar"
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              <span>Login</span>
            </Link>
          ) : (
            <button onClick={handleLogout} className="navBar">
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
