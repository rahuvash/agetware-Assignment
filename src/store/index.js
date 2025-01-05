import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlices"
import productReducer from "./productSlice"
import authReducer from "./authSlice"
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product:productReducer,
    auth:authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
