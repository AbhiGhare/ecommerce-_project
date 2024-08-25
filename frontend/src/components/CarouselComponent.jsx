import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const CarouselComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}products`);
        const randomProducts = response.data.sort(() => 0.5 - Math.random()).slice(0, 8);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-200 leading-normal tracking-wide">
      <h1
        className="mx-12 my-10 text-gray-700 text-5xl lg:text-6xl text-center"
        style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
      >
        Popular Products
      </h1>

      <div className="container mx-auto w-full overflow-hidden relative">
        {/* Background gradients on the sides */}
        <div className="w-full h-full absolute">
          <div
            className="w-1/4 h-full absolute z-50 left-0"
            style={{
              background:
                'linear-gradient(to right, #edf2f7 0%, rgba(255, 255, 255, 0) 100%)',
              zIndex: 1,
            }}
          ></div>
          <div
            className="w-1/4 h-full absolute z-50 right-0"
            style={{
              background:
                'linear-gradient(to left, #edf2f7 0%, rgba(255, 255, 255, 0) 100%)',
              zIndex: 1,
            }}
          ></div>
        </div>

        {/* Carousel items */}
        <div
          className="carousel-items flex items-center justify-center"
          style={{
            width: 'fit-content',
            animation: 'carouselAnim 10s infinite alternate linear',
          }}
        >
          {products.map((product, index) => (
            <Link to={`/products/${product._id}`} key={index} className="carousel-focus flex items-center justify-center relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg" style={{ width: '270px' }}>
              {/* Image only */}
              <img
                className="h-64 w-full object-cover rounded-lg shadow-2xl"
                src={product.image} // Assuming the product object has an 'image' property
                alt={`Product ${index + 1}`}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Carousel animations */}
      <style>
        {`
          @keyframes carouselAnim {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(calc(-100% + (6*300px)));
            }
          }

          @media only screen and (max-width: 768px) {
            .container .carousel-items {
              animation: carouselAnim 60s infinite alternate linear;
            }
            @keyframes carouselAnim {
              from {
                transform: translate(0, 0);
              }
              to {
                transform: translate(calc(-100% + (5*300px)));
              }
            }
          }

          .carousel-focus:hover {
            transition: all 0.8s;
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default CarouselComponent;
