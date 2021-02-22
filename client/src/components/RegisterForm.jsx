import React, { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../api";
import { formatInput } from "../utilities";
import { GhibliContext } from "../context/GlobalContext";
import ErrorMessage from "./ErrorMessage";

const RegisterForm = () => {
  const { setUser, setError } = useContext(GhibliContext);
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
        setError({
          message: "Passwords are not consistent",
          hidden: false,
        });
        console.error("your psw are not consistent with your password");
        return;
      }
      const payload = {
        name: `${formatInput(FirstNameInput.current.value)} ${formatInput(
          LastNameInput.current.value
        )}`,
        email: `${formatInput(EmailInput.current.value)}`,
        password: `${PasswordInput.current.value}`,
        passwordConfirm: `${PasswordConfirmInput.current.value}`,
      };

      // const {
      //   data: {
      //     data: { user },
      //   },
      // } = await register(payload);

      // setUser(user);
      await register(payload);
      history.push("/result");

      // if (result?.data?.data.status === "success") {
      //   console.log("sent verification mail");
      //   history.push("/result");
      //   return;
      // }
      // history.push("/");
    } catch (e) {
      if (e.response?.data?.error?.errors?.password?.kind === "minlength") {
        return setError({
          message: "Password should have at least 8 char",
          hidden: false,
        });
      }

      if (e.response?.data.name === "MongoError") {
        return setError({
          message: "Email already exists",
          hidden: false,
        });
      }
    }
  };

  return (
    <div className="grid place-items-center">
      <ErrorMessage />
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
            className="inputStyle "
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
            autoComplete="new-password"
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
