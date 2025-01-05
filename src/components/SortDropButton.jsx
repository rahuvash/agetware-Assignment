// SortDropdown.js
import React from 'react';

const SortDropdown = ({ onSort }) => {
  const handleSortChange = (e) => {
    onSort(e.target.value); // Pass the selected sorting option to the parent component
  };

  return (
    <div className="mb-4">
      <select onChange={handleSortChange} className="p-2 border rounded">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
