import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { getErrorMessage, sendVerifyEmail } from "../api";
import { ToastContainer, toast } from "react-toastify";

const VerifyEmailPage = () => {
  const emailRef = useRef();
  const history = useHistory();

  const handleSendVerification = async (e) => {
    e.preventDefault();

    try {
      const payload = { email: emailRef.current?.value };
      await sendVerifyEmail(payload);

      notifySuccess(
        `Check your email ${emailRef.current?.value} for verfication`
      );
      setTimeout(() => {
        history.push("/");
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
            Verify Your Account
          </h2>

          <form className="mt-10" onSubmit={handleSendVerification}>
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
              Send Verification mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
