import React, { useContext } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GhibliContext } from "../context/GlobalContext";
import cx from "classnames";

const ErrorMessage = () => {
  const { error, setError } = useContext(GhibliContext);

  const handleCloseErr = () => {
    setError({ message: "", hidden: true });
  };

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
