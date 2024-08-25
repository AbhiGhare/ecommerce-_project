import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk action to fetch cart data
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data; // Assuming response.data contains cart data with `cartItems`
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch cart data');
    }
  }
);

// Asynchronous thunk action to update item quantity
export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/cart/item`,
          { productId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data; // Assuming response.data contains updated cart data
      }
    } catch (error) {
      return rejectWithValue('Failed to update item quantity');
    }
  }
);

// Asynchronous thunk action to delete an item
export const deleteItem = createAsyncThunk(
  'cart/deleteItem',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/item`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data: { productId }, // Pass productId in the request body
          }
        );
        return productId; // Return productId for removing it from state
      }
    } catch (error) {
      return rejectWithValue('Failed to delete item');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartCount: 0,
    items: [], // Initialize items as an empty array
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product._id === product.product._id);
      if (existingItem) {
        existingItem.quantity += product.quantity; // Increment the quantity if the product already exists
      } else {
        state.items.push({ ...product }); // Add new product to the cart
      }
      // Calculate the cart count safely
      state.cartCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cartItems || []; // Update items with fetched cartItems array
        // Recalculate cart count from the updated items array
        state.cartCount = state.items.reduce((count, item) => count + item.quantity, 0);
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateItemQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the items with new quantities
        const updatedItems = state.items.map(item =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        state.items = updatedItems;
        // Recalculate cart count from the updated items array
        state.cartCount = state.items.reduce((count, item) => count + item.quantity, 0);
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted item from the items array
        state.items = state.items.filter(item => item.product._id !== action.payload);
        // Recalculate cart count from the updated items array
        state.cartCount = state.items.reduce((count, item) => count + item.quantity, 0);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
