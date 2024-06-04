import React from "react";
import "./Card.scss"

const Card = ({ title, value }) => {
  return (
    <div className="card-wrapper">
      <span>{value}</span>
      <span>{title}</span>
    </div>
  );
};

export default Card;
