import React, { useState } from 'react';
import axios from 'axios';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addFavoriteProduct, fetchFavoriteProducts } from '../features/favorites/favoritesSlice';
import Toast from './Toast';

const ProductCard = ({ product }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = async (action) => {
    const token = localStorage.getItem('nayahe_hai');
    if (token) {
      if (action === 'addToCart') {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/cart`,
            { productId: product._id, quantity: 1 },
            { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
          );

          if (response.status === 200) {
            setToast({ show: true, message: 'Added to Cart successfully!', type: 'success' });
            dispatch(addToCart({ product, quantity: 1 }));
          } else {
            setToast({ show: true, message: 'Failed to add to cart.', type: 'error' });
          }
        } catch (error) {
          console.error('Error adding to cart:', error.response ? error.response.data : error.message);
          setToast({ show: true, message: 'Error adding to cart. Please try again.', type: 'error' });
        }
      } else if (action === 'favorite') {
        try {
          // Dispatch the thunk action to add to favorites
          await dispatch(addFavoriteProduct(product._id)).unwrap(); // Use unwrap() to handle errors

          // Fetch updated favorites list
          await dispatch(fetchFavoriteProducts()).unwrap(); // Fetch updated favorites list

          setToast({ show: true, message: 'Added to Favorites successfully!', type: 'success' });
        } catch (error) {
          console.error('Error adding to favorites:', error.message);
          setToast({ show: true, message: 'Error adding to favorites. Please try again.', type: 'error' });
        }
      }
    } else {
      navigate('/login');
    }

    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Function to format price in Indian Rupees
  const formatPriceInINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg flex flex-col h-full p-4 relative">
      <Toast message={toast.message} show={toast.show} type={toast.type} />
      <div className="relative w-full mb-4 overflow-hidden rounded-lg">
        <img className="w-full h-auto max-h-48 object-contain" src={product.image} alt={product.title} />
        <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
          <div
            className="text-blue-500 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <FaEye className="text-xl" />
          </div>
          <div
            className="text-red-500 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            onClick={() => handleAction('favorite')}
          >
            <FaHeart className="text-xl" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
        <div className="mt-2 mb-5 flex  flex-col items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {formatPriceInINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-900 line-through">
                {formatPriceInINR(product.originalPrice)}
              </span>
            )}
          </p>
          <div className="flex items-center">
            {/* Assuming you have the product rating here */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`h-5 w-5 ${i < 5 ? 'text-yellow-300' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5</span>
          </div>
        </div>
      </div>
      <button
        className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => handleAction('addToCart')}
      >
        <FaShoppingCart className="mr-2 text-lg" />
        <span className="text-base">Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
