import React from "react";
import "./Nav.scss";

const Nav = ({ children }) => {
  return (
    <nav>
      <ul className="nav-list">
        {children.map((child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </ul>
    </nav>
  );
};

export default Nav;
