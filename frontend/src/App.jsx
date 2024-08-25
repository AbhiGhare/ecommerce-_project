import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import MainHeader from './components/MainHeader';
import SecondaryHeader from './components/SecondaryHeader';
import Footer from './components/Footer';
import FavoritesPage from './components/FavoritesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductUpload from './pages/ProductUpload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import CheckoutForm from './pages/CheckoutForm';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import { useDispatch } from 'react-redux';
import { fetchCartData } from './features/cart/cartSlice';
import CategoryPage from './pages/CategoryPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('nayahe_hai');
    if (token) {
      dispatch(fetchCartData());
    }
  }, [dispatch]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main Header with Search Box */}
        <MainHeader />
        
        {/* Secondary Header with Navigation Links */}
        <SecondaryHeader />

        {/* Main Content */}
        <main className="flex-grow mt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categoryName/:categoryName" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage  />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/uploadProduct" element={<ProductUpload />} />
            <Route path="/sucess" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancelled />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
};

export default App;
