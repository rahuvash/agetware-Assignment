import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice';
import { motion } from 'framer-motion'; // Import Framer Motion

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product));
  };

  // Animation variants for each product item
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  // Container variants for the wishlist
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your Wishlist is empty.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              className="p-4 border rounded-lg shadow-md"
              variants={itemVariants}
            >
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleRemove(product)}
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Wishlist
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Wishlist;
