import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For getting params from URL
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlices';

const ProductDetailsPage = () => {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`) // Fetch product details by ID
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [id]); // Re-fetch data if the product ID changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      {product && (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-center">{product.title}</h1>
          
          {/* Image with hover effect */}
          <div className="w-72 h-64 overflow-hidden rounded-md">
            <img
              loading="lazy"
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform transform hover:scale-105"
            />
          </div>
          
          <p className="text-center text-gray-600 mt-4">{product.description}</p>
          <p className="font-semibold text-xl mt-2">Price: ${product.price}</p>

          {/* Rating */}
          <div className="flex items-center mt-1">
            <span className="text-yellow-500 font-bold">{product.rating.rate}</span>
            <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
