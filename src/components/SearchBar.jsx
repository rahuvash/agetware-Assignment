// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
