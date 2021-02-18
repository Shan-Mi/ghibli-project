import React, { createContext, useEffect, useState } from "react";

export const GhibliContext = createContext({});

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [films, setFilms] = useState([]);
  const [error, setError] = useState({ hidden: true, message: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <GhibliContext.Provider
      value={{
        user,
        setUser,
        films,
        setFilms,
        // token,
        // setToken,
        error,
        setError,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GhibliContext.Provider>
  );
};

export default GlobalContext;
