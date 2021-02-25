import React from "react";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const AdminGoBackBtn = ({ location, marginR }) => {
  return (
    <Link
      className={`w-max flex items-center text-xl bg-gray-200 px-3 py-1 rounded-full sticky top-0 -ml-10 transform hover:bg-gray-100 duration-200 ease-in-out ${marginR}`}
      to={location}
    >
      <TiArrowBack className="text-primary" />
      <span className="text-primary">Go back</span>
    </Link>
  );
};

export default AdminGoBackBtn;
