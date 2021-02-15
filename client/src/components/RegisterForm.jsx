import React, { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../api";
import { formulateInput } from "../utilities";
import { GhibliContext } from "../context/GlobalContext";

const RegisterForm = () => {
  const { setUser, setToken } = useContext(GhibliContext);
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
        console.error("your psw are not consistent with your password");
        return;
      }
      const payload = {
        name: `${formulateInput(FirstNameInput.current.value)} ${formulateInput(
          LastNameInput.current.value
        )}`,
        email: `${formulateInput(EmailInput.current.value)}`,
        password: `${PasswordInput.current.value}`,
        passwordConfirm: `${PasswordConfirmInput.current.value}`,
      };

      const {
        data: {
          data: { user },
          token,
        },
      } = await register(payload);

      console.log(user);
      console.log(token);
      setUser(user);
      setToken(token);
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center">
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
              <label
                htmlFor="firstname"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Firstname
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="John"
                autoComplete="given-name"
                ref={FirstNameInput}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Doe"
                autoComplete="family-name"
                ref={LastNameInput}
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <label
            htmlFor="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john.doe@company.com"
            autoComplete="email"
            ref={EmailInput}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
            placeholder="********"
            autoComplete="new-password"
            ref={PasswordInput}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <label
            htmlFor="password-confirm"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Confirm password
          </label>
          <input
            id="password-confirm"
            type="password"
            name="password-confirm"
            placeholder="********"
            autoComplete="new-password"
            ref={PasswordConfirmInput}
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />
          <button
            type="submit"
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
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
