import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
