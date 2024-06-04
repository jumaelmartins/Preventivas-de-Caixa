import React from "react";
import "./Header.scss";
import Logo from "../../assets/imgs/Logo.png";
import { SearchIcon } from "../../Icons/SearchIcon";

const Header = () => {
  return (
    <header>
      <img className="logo" src={Logo} />

      <form action="" method="post">
        <fieldset>
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input id="search" name="search" type="search" placeholder="Buscar" />
        </fieldset>
      </form>
    </header>
  );
};

export default Header;
