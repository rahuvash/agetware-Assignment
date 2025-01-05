import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For navigation
import { addToCart } from '../store/cartSlices';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice'; // Import wishlist actions
import { FaCartPlus, FaHeart, FaRegHeart, FaEye } from 'react-icons/fa'; // Importing icons
import { motion } from 'framer-motion'; // Import framer motion

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false); // Track if the product is added to the cart
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist); // Access wishlist from Redux store
  const isProductInWishlist = wishlist.some((item) => item.id === product.id); // Check if product is in wishlist

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true); // Set to true when the product is added
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  const handleViewDetails = () => {
    // Navigate to product details page
    navigate(`/product/${product.id}`);
  };

  const handleAddToWishlist = () => {
    if (isProductInWishlist) {
      dispatch(removeFromWishlist(product)); // Remove from wishlist if already added
    } else {
      dispatch(addToWishlist(product)); // Add to wishlist if not already added
    }
  };

  // Variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      className="p-4 border rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center bg-white"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="w-full h-40 flex items-center justify-center bg-gray-100 rounded hover:shadow-md transition-shadow duration-300"
        whileHover={{ scale: 1.05 }} // Scale image on hover
        transition={{ duration: 0.3 }}
      >
        <img
          loading="lazy"
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </motion.div>

      <motion.h3
        className="text-lg font-bold mt-2 text-center hover:text-blue-500 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {product.title}
      </motion.h3>

      <motion.p
        className="text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ${product.price.toFixed(2)}
      </motion.p>

      <motion.div
        className="mt-4 flex justify-center gap-4 w-full"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        exit="initial"
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Add to Cart Button with Icon */}
        <motion.button
          onClick={handleAddToCart}
          className={`p-2 rounded ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all duration-200`}
          whileTap={{ scale: 0.95 }} // Shrink button on tap for feedback
        >
          <FaCartPlus size={20} />
        </motion.button>

        {/* View Details Button with Icon */}
        <motion.button
          onClick={handleViewDetails}
          className="p-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
          whileTap={{ scale: 0.95 }} // Shrink button on tap
        >
          <FaEye size={20} />
        </motion.button>

        {/* Add/Remove from Wishlist Button with Icon */}
        <motion.button
          onClick={handleAddToWishlist}
          className={`p-2 rounded ${isProductInWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white transition-all duration-200`}
          whileTap={{ scale: 0.95 }} // Shrink button on tap
        >
          {isProductInWishlist ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
