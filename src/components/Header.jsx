import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Importing icons from React Icons

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItemCount = useSelector((state) => state.cart.items.length);

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <h1 className="text-xl font-semibold">
        <Link to="/" className="hover:text-blue-300 transition">
          E-Commerce
        </Link>
      </h1>
      <div className="flex items-center space-x-4">
        {/* Wishlist Link with Icon */}
        <Link
          to="/wishlist"
          className="relative text-lg font-medium hover:text-blue-300 transition"
        >
          <FaHeart size={20} />
        </Link>

        {/* Cart Link with Icon */}
        <Link
          to="/cart"
          className="relative text-lg font-medium hover:text-blue-300 transition"
        >
          <FaShoppingCart size={20}/>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
