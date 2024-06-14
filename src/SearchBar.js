import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <input type="text" placeholder="Rechercher par nom..." onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
};

export default SearchBar;
