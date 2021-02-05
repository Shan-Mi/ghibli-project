import React, { useContext, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getErrorMessage,
  getSuccessMessage,
  login,
  sendResetPassword,
} from "../api";
import { GhibliContext } from "../context/GlobalContext";

const ResetPage = () => {
  const [isHidden, setIsHidden] = useState("hidden");
  const [text, setText] = useState("");
  const emailRef = useRef();
  const history = useHistory();

  const showMsg = (text) => {
    setIsHidden("");
    setText(text);
    setTimeout(() => {
      setIsHidden("hidden");
    }, 2500);
  };

  const handleResetPsw = async (e) => {
    e.preventDefault();
    let payload;

    try {
      payload = { email: emailRef.current?.value };
      const res = await sendResetPassword(payload);
      // console.log(res);
      showMsg(getSuccessMessage(res));
      setTimeout(() => {
        history.push("/resetPassword");
      }, 3000);
    } catch (e) {
      console.error(getErrorMessage(e));
      showMsg(getErrorMessage(e));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div
        className={`absolute ${isHidden} left-1/2 -translate-x-1/2 md:w-6/12 lg:w-5/12 2xl:w-4/12 h-20 bg-blue-400 rounded-md shadow-sm flex justify-center items-center text-red-700 text-2xl font-Montserrat transition transform all duration-150 ease-in-out`}
      >
        {text}
      </div>
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
          px-6 py-10 sm:px-10 sm:py-6
          bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Send Reset Token
          </h2>

          <form className="mt-10" onSubmit={handleResetPsw}>
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

            <button
              type="submit"
              className="w-full py-3 mt-8 bg-gray-800 rounded-sm
                  font-medium text-white uppercase
                  focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Send reset password mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
