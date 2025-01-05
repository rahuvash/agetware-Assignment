import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState(''); // State for sorting option

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price; // Sort by price ascending
      case 'price-desc':
        return b.price - a.price; // Sort by price descending
      case 'rating-asc':
        return a.rating.rate - b.rating.rate; // Sort by rating ascending
      case 'rating-desc':
        return b.rating.rate - a.rating.rate; // Sort by rating descending
      default:
        return 0; // No sorting
    }
  });

  return (
    <div className="container mx-auto p-4 mt-20">
      {/* Search bar */}
      <div className="flex justify-between w-full">
  {/* Search Bar */}
  <div className="mb-4 flex items-center w-full sm:w-1/2 lg:w-1/3">
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      className="p-2 border rounded w-full"
    />
  </div>

  {/* Sort Options */}
  <div className="mb-4 flex items-center w-full sm:w-1/2 lg:w-1/4">
    <select
      value={sortOption}
      onChange={e => setSortOption(e.target.value)}
      className="p-2 border rounded w-full"
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
      <option value="rating-desc">Rating: High to Low</option>
    </select>
  </div>
</div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        // Display sorted and filtered products
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
