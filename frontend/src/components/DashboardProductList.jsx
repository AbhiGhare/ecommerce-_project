import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component

const DashboardProductList = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Fetch data from API using axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`); // Fetch from API
        setProducts(response.data); // Store data in state
        setLoading(false); // Set loading to false after data is loaded
      } catch (err) {
        setError(err.message); // Store error message in state
        setLoading(false); // Set loading to false if error occurs
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <p>Loading products...</p>; // Show loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-transparent bg-clip-text">
        PRODUCT LIST
        <span className="inline-block py-1 px-3 text-sm font-medium text-white bg-blue-500 rounded-full ml-3">
          Newest
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            additionalText={`Special Offer: Save $${(product.price * 0.1).toFixed(2)}`}
            customClass="bg-green-50"
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardProductList;
