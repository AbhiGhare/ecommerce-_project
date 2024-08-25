import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('hello');
    
    // Fetch data based on the category name
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/category`,{
            category: categoryName
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product,i) => (
           <div key={i} className="flex-shrink-0 w-full sm:w-60">
           <ProductCard
               product={product}
               additionalText={`Special Offer: Save $${(product.price * 0.1).toFixed(2)}`}
               customClass="bg-blue-50"
           />
       </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
