import React from "react";
import "./Card.scss"

const Card = ({ title, value, className }) => {
  return (
    <div className={"card-wrapper " + className}>
      <span>{value}</span>
      <span>{title}</span>
    </div>
  );
};

export default Card;
