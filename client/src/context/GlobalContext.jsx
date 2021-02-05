import React, { createContext, useEffect, useState } from "react";

export const GhibliContext = createContext({});

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [films, setFilms] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  return (
    <GhibliContext.Provider
      value={{ user, setUser, films, setFilms, token, setToken }}
    >
      {children}
    </GhibliContext.Provider>
  );
};

export default GlobalContext;
