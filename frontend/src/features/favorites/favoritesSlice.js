import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch favorite products
export const fetchFavoriteProducts = createAsyncThunk(
  'favorites/fetchFavoriteProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Adjust based on your API response
      } else {
        return rejectWithValue('No token found');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch favorite products');
    }
  }
);

// Add product to favorites
export const addFavoriteProduct = createAsyncThunk(
  'favorites/addFavoriteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/add`,
          { productId },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        return response.data; // Adjust based on your API response
      } else {
        return rejectWithValue('No token found');
      }
    } catch (error) {
      return rejectWithValue('Failed to add product to favorites');
    }
  }
);

// Remove a product from favorites
export const removeFavoriteProduct = createAsyncThunk(
    'favorites/removeFavoriteProduct',
    async (productId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('nayahe_hai');
        if (token) {
          await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/remove/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return productId; // Return productId to remove it from the state
        } else {
          return rejectWithValue('No token found');
        }
      } catch (error) {
        return rejectWithValue('Failed to remove product from favorites');
      }
    }
  );

// Clear all favorites
export const clearAllFavorites = createAsyncThunk(
  'favorites/clearAllFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('nayahe_hai');
      if (token) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/clear`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        return; // Clear all favorites
      } else {
        return rejectWithValue('No token found');
      }
    } catch (error) {
      return rejectWithValue('Failed to clear favorites');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    favoritesCount: 0,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products || []; // Adjust based on API response
        state.favoritesCount = state.items.length;
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addFavoriteProduct.fulfilled, (state, action) => {
        state.items.push(action.payload.product); // Adjust based on API response
        state.favoritesCount = state.items.length;
      })
      .addCase(removeFavoriteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.favoritesCount = state.items.length;
      })
      .addCase(clearAllFavorites.fulfilled, (state) => {
        state.items = [];
        state.favoritesCount = 0;
      });
  },
});

export default favoritesSlice.reducer;
