import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlices';
import { motion } from 'framer-motion'; // Import Framer Motion

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Variants for cart items animation
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  // Variants for cart container animation
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
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Staggered animations for cart items */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {cartItems.map(item => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
                variants={itemVariants}
              >
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border rounded mr-2"
                  />
                  <motion.button
                    onClick={() => handleRemove(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    whileHover={{ scale: 1.1 }} // Hover effect
                    whileTap={{ scale: 0.95 }} // Tap effect
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Total and Checkout Button */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <motion.button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>alert("Checkout Successfully")}
            >
              Checkout
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;
