import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice.js';
import userReducer from '../features/user/userSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import favoritesReducer from '../features/favorites/favoritesSlice.js'
export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
