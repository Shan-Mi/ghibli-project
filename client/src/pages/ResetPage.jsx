import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { getErrorMessage, sendResetPassword } from "../api";
import { ToastContainer, toast } from "react-toastify";

const ResetPage = () => {
  const emailRef = useRef();
  const history = useHistory();

  const handleResetPsw = async (e) => {
    e.preventDefault();
    try {
      const payload = { email: emailRef.current?.value };
      const {
        data: { message },
      } = await sendResetPassword(payload);

      notifySuccess(message);

      setTimeout(() => {
        history.push("/result");
      }, 3000);
    } catch (e) {
      getErrorMessage(e)
        .split(",")
        .map((err) => notifyError(err));
    }
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  return (
    <div className="flex flex-col h-fullHeight bg-gray-100">
      <ToastContainer />
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
            <label htmlFor="email" className="labelStyle">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autoComplete="email"
              ref={emailRef}
              className="underLine"
              required
            />

            <button type="submit" className="subBtn">
              Send reset password mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
