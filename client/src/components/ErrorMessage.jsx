import React, { useContext, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GhibliContext } from "../context/GlobalContext";
import cx from "classnames";

const ErrorMessage = () => {
  const { error, setError } = useContext(GhibliContext);

  const handleCloseErr = () => {
    setError({ message: "", hidden: true });
  };

  useEffect(() => {
    // hide error message after 4500 ms if the user is not closing this component by themselves.
    const timer = setTimeout(() => {
      setError({ ...error, hidden: true });
    }, 4500);
    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div
      className={cx(
        "w-4/5 px-10 py-3 bg-red-400 text-dark font-Amaranth text-xl flex items-center justify-center sticky top-5 mx-auto rounded-md",
        error.hidden && "hidden"
      )}
    >
      <button className="absolute top-2 right-2" onClick={handleCloseErr}>
        <IoCloseCircleOutline />
      </button>
      {error?.message}
    </div>
  );
};

export default ErrorMessage;
