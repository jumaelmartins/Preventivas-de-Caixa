// src/components/search/SearchBar.jsx
import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
