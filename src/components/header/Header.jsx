import React from "react";
import "./Header.scss";
import Logo from "../../assets/imgs/Logo.png";

const Header = () => {
  return (
    <header>
      <img className="logo" src={Logo} />
    </header>
  );
};

export default Header;
