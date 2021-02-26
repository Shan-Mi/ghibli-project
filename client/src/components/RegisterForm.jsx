import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../api";
import { formatInput } from "../utilities";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const FirstNameInput = useRef();
  const LastNameInput = useRef();
  const EmailInput = useRef();
  const PasswordInput = useRef();
  const PasswordConfirmInput = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (PasswordInput.current?.value !== PasswordConfirmInput.current.value) {
        return notifyError("Passwords are not consistent");
      }

      const payload = {
        name: `${formatInput(FirstNameInput.current.value)} ${formatInput(
          LastNameInput.current.value
        )}`,
        email: `${formatInput(EmailInput.current.value)}`,
        password: `${PasswordInput.current.value}`,
        passwordConfirm: `${PasswordConfirmInput.current.value}`,
      };

      await register(payload);
      notifySuccess("Your account has been registered successfully");
      history.push("/result");
    } catch (e) {
      if (e.response?.data?.error?.errors?.password?.kind === "minlength") {
        return notifyError("Password should have at least 8 char");
      }

      if (e.response?.data.name === "MongoError") {
        return notifyError("Email already exists");
      }
    }
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  return (
    <div className="grid place-items-center">
      <ToastContainer />
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-xl font-semibold">
          <span className="block text-center font-Montserrat text-xl mb-5">
            Welcome to Ghibli Fans' Home 👋 !
          </span>
          <span className="block text-center text-base font-thin italic">
            Please fill in your information to continue
          </span>
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label htmlFor="firstname" className="labelStyle">
                Firstname
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="John"
                autoComplete="given-name"
                ref={FirstNameInput}
                className="inputStyle"
                required
              />
            </span>
            <span className="w-1/2">
              <label htmlFor="lastname" className="labelStyle">
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Doe"
                autoComplete="family-name"
                ref={LastNameInput}
                className="inputStyle"
                required
              />
            </span>
          </div>
          <label htmlFor="email" className="labelStyle mt-2">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john.doe@company.com"
            autoComplete="email"
            ref={EmailInput}
            className="inputStyle"
            required
          />
          <label htmlFor="password" className="labelStyle mt-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            autoComplete="password"
            ref={PasswordInput}
            className="inputStyle"
            required
          />
          <label htmlFor="password-confirm" className="labelStyle mt-2">
            Confirm password
          </label>
          <input
            id="password-confirm"
            type="password"
            name="password-confirm"
            placeholder="********"
            autoComplete="new-password"
            ref={PasswordConfirmInput}
            className="inputStyle"
            required
          />
          <button type="submit" className="subBtn">
            Sign up
          </button>
          <Link
            to="/login"
            className=" justify-between inline-flex mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"
          >
            Already registered?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
