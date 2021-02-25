import React, { createContext, useEffect, useState } from "react";

export const GhibliContext = createContext({});

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [films, setFilms] = useState([]);
  const [error, setError] = useState({ hidden: true, message: "" });
  const [status, setStatus] = useState({
    isLoggedIn: false,
    isVerified: false,
  });

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
        error,
        setError,
        status,
        setStatus,
      }}
    >
      {children}
    </GhibliContext.Provider>
  );
};

export default GlobalContext;
