// src/components/FavoritesPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteProducts, removeFavoriteProduct, clearAllFavorites } from '../features/favorites/favoritesSlice';
import ProductCard from './ProductCard';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { items: favorites, status, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  const handleRemoveFavorite = async(productId) => {
    await dispatch(removeFavoriteProduct(productId)).unwrap(); 
    await dispatch(fetchFavoriteProducts());
  };

  const handleClearAllFavorites = () => {
    dispatch(clearAllFavorites());
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <button
          onClick={handleClearAllFavorites}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear All Favorites
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard product={product?.product} />
              <button
                onClick={() => handleRemoveFavorite(product.product._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div>No favorite products found.</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
