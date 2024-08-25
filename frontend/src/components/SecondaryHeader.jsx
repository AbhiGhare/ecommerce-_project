import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeadphones, FaSpeakerDeck, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa'; // Example icons

const categories = [
  {
    name: 'Accessories',
    icon: <FaPhoneAlt className="w-5 h-5" />, // Icon for Accessories
    subcategories: [
      'USB',
      'phone holder',
      'Mobile Stand',
    ],
  },
  {
    name: 'Audio and Music',
    icon: <FaHeadphones className="w-5 h-5" />, // Icon for Audio and Music
    subcategories: [
      'Neckband',
      'Wired Earphone',
      'wireless Headphone',
      'earbuds'

    ],
  },
  {
    name: 'Speakers',
    icon: <FaSpeakerDeck className="w-5 h-5" />, // Icon for Speakers
    subcategories: [
      'speakers',
      'wireless speakers',
      'Bluetooth speaker',
      'Portable speaker'

    ],
  },
];

const SecondaryHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-86 left-0 right-0 z-30">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <button
            className="text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex flex-wrap items-center space-x-4 sm:space-x-8 lg:space-x-12">
            <Link to="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link>
            <Link to="/products" className="hover:text-gray-300 transition-colors duration-200">Products</Link>
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative hidden lg:block"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to="#"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </Link>
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2  w-48 bg-gray-800 text-white rounded-lg shadow-lg transition-opacity duration-300 ${hoveredCategory === category.name ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <ul className="py-2 text-sm">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={`/categoryName/${subcategory}`}
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 transition-transform ${isMobileMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
          <div className="flex flex-col p-4">
            {categories.map((category, index) => (
              <div key={index} className="relative">
                <button
                  className="flex items-center space-x-2 w-full text-white hover:text-gray-300 py-2"
                  onClick={() => setHoveredCategory(hoveredCategory === category.name ? null : category.name)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div
                  className={`ml-4 mt-2 bg-gray-800 rounded-lg shadow-lg ${hoveredCategory === category.name ? 'block' : 'hidden'}`}
                >
                  <ul className="text-sm">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={`/categoryName/${subcategory.replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          {subcategory}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <button
              className="mt-4 text-white hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryHeader;
