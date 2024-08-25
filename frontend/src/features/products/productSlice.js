import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state
const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for the product upload
export const uploadProduct = createAsyncThunk('products/uploadProduct', async (formData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.post(apiUrl+'/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
