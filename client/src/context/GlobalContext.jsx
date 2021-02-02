import React, { createContext, useState } from "react";

export const GhibliContext = createContext({});

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [films, setFilms] = useState([]);

  return (
    <GhibliContext.Provider value={{ user, setUser, films, setFilms }}>
      {children}
    </GhibliContext.Provider>
  );
};

export default GlobalContext;
