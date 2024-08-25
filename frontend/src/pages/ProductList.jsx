import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// import { getProducts } from '../services/api';
import { FaSort, FaFilter } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  // useEffect(() => {
  //   getProducts().then(data => {
  //     console.log('Fetched products:', data); // Debug data
  //     setProducts(data);
  //     setFilteredProducts(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log('Products before filtering:', products); // Debug before filtering
  //   const filtered = products
  //     .filter(product => product.price >= 0 && product.price <= 100)
  //     .filter(product => product.rating >= 0 && product.rating <= 5);
  //   //   .sort((a, b) => (sortOrder === 'newest' ? b.date - a.date : a.date - b.date));
    
  //   console.log('Filtered products:', filtered); // Debug after filtering
  //   // setFilteredProducts(filtered);
  // }, [sortOrder, products]);

  return (
    <div className="container mx-auto px-4 py-4"> {/* Added px-4 for left and right margins */}
      {/* Top Controls */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaFilter className="text-blue-500 mr-2" />
          <span>Showing: {filteredProducts.length} products</span>
        </div>
        <div className="flex items-center">
          <FaSort className="text-blue-500 mr-2" />
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
