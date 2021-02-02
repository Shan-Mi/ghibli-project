import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styled";

const Header = () => {
  return (
    <S.Nav>
      <Link to="/">This is header.</Link>
      <Link to="/login">Login</Link>
      <S.Btn>Logout</S.Btn>
    </S.Nav>
  );
};

export default Header;
