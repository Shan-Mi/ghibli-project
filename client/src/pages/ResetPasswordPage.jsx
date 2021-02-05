import React, { useState, useRef, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getErrorMessage, resetPassword } from "../api";
import { GhibliContext } from "../context/GlobalContext";

const ResetPasswordPage = () => {
  const { setUser, setToken } = useContext(GhibliContext);
  const history = useHistory();
  const [isHidden, setIsHidden] = useState("hidden");
  const [text, setText] = useState("");
  const psw = useRef();
  const pswConfirm = useRef();
  const location = useLocation();
  const tokenVal = location.pathname.split("/")[2];

  // console.log(tokenVal);

  const showMsg = (text) => {
    setIsHidden("");
    setText(text);
    setTimeout(() => {
      setIsHidden("hidden");
    }, 2500);
  };

  const ResetPsw = async (e) => {
    e.preventDefault();
    const payload = {
      password: psw.current?.value,
      passwordConfirm: pswConfirm.current?.value,
    };

    try {
      const {
        data: {
          data: { user },
          token,
        },
        status,
      } = await resetPassword(payload, tokenVal);
      console.log(user, token);
      if (status === 200) {
        showMsg("You have successfully reset password.");
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        setTimeout(() => {
          showMsg("Password reset completed! Welcome back!")
        }, 2000)
        history.push("/");
      }
    } catch (e) {
      console.error(e.response);
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
            Reset Password
          </h2>

          <form className="mt-10" onSubmit={ResetPsw}>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="password"
              ref={psw}
              className="block w-full py-3 px-1 mt-2 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <label
              htmlFor="passwordConfirm"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Password Confirm
            </label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="password confirm"
              autoComplete="password"
              ref={pswConfirm}
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
              Reset your password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
