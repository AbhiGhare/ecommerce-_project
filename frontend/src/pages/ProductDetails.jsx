import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getProduct } from '../services/api';  // Import the getProduct function
import { addToCart } from '../features/cart/cartSlice';  // Import addToCart action from Redux slice
import { FaStar, FaCartPlus } from 'react-icons/fa';
import Toast from '../components/Toast';

const ProductDetails = () => {
  const { id } = useParams();  // Use the product ID from the route parameters
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [toast, setToast] = useState({ show: false, message: '', type: '' }); // Toast state

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setError('Failed to fetch product details.');  // Set error state
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };
    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('nayahe_hai'); // Assuming token is stored in local storage

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId: product._id, quantity }, // Use selected quantity
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setToast({ show: true, message: 'Added to Cart successfully!', type: 'success' });
        dispatch(addToCart({ product, quantity }));
      } else {
        setToast({ show: true, message: 'Failed to add to cart.', type: 'error' });
      }
    } catch (error) {
      setToast({ show: true, message: 'An error occurred while adding to cart.', type: 'error' });
    }
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  if (loading) return <p>Loading...</p>;  // Show loading state
  if (error) return <p>{error}</p>;  // Show error state

  if (!product) return <p>No product found.</p>;  // Handle case where no product data is found

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Toast message={toast.message} show={toast.show} type={toast.type} />
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <div className="relative w-full h-80 overflow-hidden rounded-lg border border-gray-300 p-4 bg-white">
            <img
              className="object-contain w-full h-full"
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="md:w-1/2 md:pl-8">
          {/* Product Details Card */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-green-500 mb-4">${product.price}</p>
            <p className="text-lg font-medium text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full flex items-center justify-center"
            >
              <FaCartPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Ratings and Comments Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rating Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-yellow-500 h-full" style={{ width: '75%' }}></div>
            </div>
            <span className="ml-2 flex items-center">
              <FaStar className="text-yellow-500 mr-1" /> 4.5/5
            </span>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <ul>
              <li className="border-b py-2">Great product!</li>
              <li className="border-b py-2">Very satisfied with the purchase.</li>
              <li className="border-b py-2">Good value for the money.</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Add a Comment</h2>
            <textarea
              rows="4"
              placeholder="Write your comment here..."
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full">
              Submit Comment
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ProductDetails;
