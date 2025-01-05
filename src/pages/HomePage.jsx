import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';



const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        //console.log(response.data)
        
        setProducts(response.data);

        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
