import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios for making API requests
import { fetchCartData } from '../features/cart/cartSlice';
import { fetchFavoriteProducts } from '../features/favorites/favoritesSlice';
// import logo from './../assets/logo.png';
import logo from './../assets/logo2.png';

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to control dropdown visibility
  const token = localStorage.getItem('nayahe_hai');
  const cartCount = useSelector((state) => state.cart.cartCount);
  const favoriteCount = useSelector((state) => state.favorites.favoritesCount);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData());
      dispatch(fetchFavoriteProducts());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.removeItem('nayahe_hai');
    navigate('/login');
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Start searching when input has more than 2 characters
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/search?query=${query}`);
        setSearchResults(response.data);
        setIsDropdownVisible(true);
      } catch (err) {
        console.error(err.message);
        setIsDropdownVisible(false);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleResultClick = () => {
    setIsDropdownVisible(false); // Hide dropdown when a result is clicked
    setSearchQuery(''); // Clear the search input
  };

  return (
    <header className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </Link>
        </h1>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Search Input */}
        <div className={`hidden md:flex flex-grow mx-8 relative`}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {/* Dropdown Search Results */}
          {isDropdownVisible && searchResults.length > 0 && (
            <ul className="absolute z-50 mt-2 w-full bg-white text-black rounded-md shadow-lg max-h-60 overflow-y-auto" style={{top:'29px'}}>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  onClick={handleResultClick}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  <Link to={`/products/${product._id}`} className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-8 h-8 mr-2" />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/favorites" className="relative group">
            <FaHeart className="text-xl group-hover:text-gray-400" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
              {favoriteCount}
            </span>
          </Link>
          <Link to="/cart" className="relative group">
            <FaShoppingCart className="text-xl group-hover:text-gray-400" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1">
              {cartCount}
            </span>
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center hover:text-gray-300"
            >
              <FaUser className="mr-1" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-300 flex items-center">
                <FaUser className="mr-1" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-80 z-40 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl self-end text-white"
            >
              <FaTimes />
            </button>
            <Link to="/favorites" className="text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Favorites
            </Link>
            <Link to="/cart" className="text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Cart ({cartCount})
            </Link>
            {token ? (
              <button
                onClick={handleLogout}
                className="text-white py-2"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" className="text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
