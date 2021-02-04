import React, { useContext, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../api";
import { GhibliContext } from "../context/GlobalContext";
// import {IoCloseOutline} from ''
// should include signup / login / logout
const LoginForm = () => {
  const { user, setUser, loginToken, setLoginToken } = useContext(
    GhibliContext
  );
  const [isHidden, setIsHidden] = useState("hidden");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const {
        data: {
          data: { user },
          token,
        },
      } = await login(email, password);
      setUser(user);
      setLoginToken(token);
      history.push("/");
    } catch (e) {
      console.error(e);
      setIsHidden("");
      setTimeout(() => {
        setIsHidden("hidden");
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div
        className={`absolute ${isHidden} left-1/2 -translate-x-1/2 md:w-6/12 lg:w-5/12 2xl:w-4/12 h-20 bg-blue-400 rounded-md shadow-sm flex justify-center items-center text-red-700 text-2xl font-Montserrat transition transform all duration-150 ease-in-out`}
      >
        Invalid user
      </div>
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-10" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autoComplete="email"
              ref={emailRef}
              className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              ref={passwordRef}
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-8 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="forgot-password" className="flex-2 underline">
                Forgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to="/register" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>

          <button
            className="group w-full py-3 mt-8 bg-gray-200 rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-gray-300 hover:shadow-none hover:transform all duration-100 ease-in-out"
          >
            <p className="text-center ml-0 block text-gray-500 text-xs mx-4 mt-1 sm:my-auto group-hover:text-pink-700 hover:transform all duration-150 ease-in-out">
              Verify your email address
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;