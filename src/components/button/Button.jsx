import React from "react";
import { NavLink } from "react-router-dom";
import "./Button.scss";

const Button = ({ to, children }) => {
  return (
    <NavLink className="button" to={to}>
      {children}
    </NavLink>
  );
};

export default Button;
