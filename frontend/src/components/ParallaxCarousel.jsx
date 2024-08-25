import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Function to get random items from an array
const getRandomItems = (array, num) => {
  let shuffled = array.slice(0);
  let i = array.length;
  let min = i - num;
  let temp, index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};

// Tailwind CSS configuration for custom styles
const TailwindConfigScript = () => {
  return (
    <script>
      {`
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                generalSans: "'General Sans', san-serif",
              },
              keyframes: {
                parallax: {
                  '0%': {
                    objectPosition: 'center',
                  },
                  '100%': {
                    objectPosition: '0 0',
                  },
                },
              },
              animation: {
                parallax: 'parallax linear both',
              },
            }
          }
        }
      `}
    </script>
  );
};

const ParallaxCarousel = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        const fetchedProducts = response.data;

        // Ensure there are products to select from
        if (fetchedProducts.length > 0) {
          const randomProducts = getRandomItems(fetchedProducts, 10);
          setProducts(randomProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product page
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-generalSans mt-2">
      <TailwindConfigScript />
      <div className="py-8">
        <h1 className="text-center text-2xl md:text-4xl font-medium">
          Top Selling  Products
        </h1>
      </div>
      <div className="overflow-hidden">
        <div className="relative overflow-x-auto hide-scrollbar">
          <div className="slides w-full whitespace-nowrap touch-pan-x before:shrink-0 after:shrink-0 before:w-[36vw] after:w-[36vw] snap-mandatory flex snap-x">
            {/* Slide Images */}
            {products.map((product, index) => (
              <div
                key={product._id} // Use product ID as key
                className="slide flex-shrink-0 w-[70vw] h-[calc(70vw*1.5)] sm:w-[40vw] sm:h-[calc(40vw*1.5)] md:w-[25vw] md:h-[calc(25vw*1.5)] overflow-clip relative mx-2 snap-center rounded-3xl"
                onClick={() => handleImageClick(product._id)} // Add click handler
              >
                <img
                  src={product.image}
                  alt={`Image ${index + 1}`}
                  className="block w-full h-full object-cover object-center absolute right-0 animate-parallax cursor-pointer" // Add cursor pointer for click indication
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxCarousel;
