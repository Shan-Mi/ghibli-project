import React, { useEffect } from "react";
import FilmDetail from "../components/FilmDetail";

const FilmPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return <FilmDetail />;
};

export default FilmPage;
