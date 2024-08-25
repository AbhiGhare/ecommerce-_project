import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaCreditCard, FaTrash, FaPlus, FaMinus, FaDollarSign } from 'react-icons/fa';
import { MdLocalShipping, MdPayment } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';
import { fetchCartData, updateItemQuantity, deleteItem } from '../features/cart/cartSlice.js'; // Update with correct path

const stripePromise = loadStripe('pk_test_51PqzylF3Gw8WOVEszq0jJNerrtxK8hRYteyFXddZKmrUzodpMX5yglJiDLU7iudwy1ITLeoY11PrfOwUYWDgbFe800FWObyiB9');

const Cart = () => {
  const dispatch = useDispatch();
  const { items: productsInCart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleQuantityChange = async (id, delta) => {
    const product = productsInCart.find(p => p.product._id === id);
    if (product) {
      const newQuantity = Math.max(product.quantity + delta, 1);
      await dispatch(updateItemQuantity({ productId: id, quantity: newQuantity }));
      // Fetch updated cart data after updating quantity
      dispatch(fetchCartData());
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteItem(id));
    // Fetch updated cart data after deleting item
    dispatch(fetchCartData());
  };

  const calculateTotalPrice = () => {
    return productsInCart.reduce((total, product) => total + (product.product.price * product.quantity), 0);
  };

  const calculateDiscount = (totalPrice) => {
    return totalPrice * 0.1;
  };

  const totalPrice = calculateTotalPrice();
  const discount = calculateDiscount(totalPrice);
  const finalPrice = totalPrice - discount;

  const makePayment = async () => {
    const stripe = await stripePromise;
    const body = {
      products: productsInCart.map(product => ({
        dish: product.product.name, // Adjust field names as needed
        imgdata: product.product.image,
        price: product.product.price,
        qnty: product.quantity
      }))
    };
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    }
  };

  // Function to format price in Indian Rupees
  const formatPriceInINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (status === 'loading') return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-lg font-semibold text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Product List Table */}
      <div className="w-full lg:w-3/4 bg-white p-4 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaShoppingCart className="mr-2 text-lg" /> Product List
        </h2>
        {productsInCart.length === 0 ? (
          <div className="text-center text-lg text-gray-600">Your cart is currently empty.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left text-sm">
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsInCart.map(product => (
                  <tr key={product.product._id} className="border-b text-sm">
                    <td className="p-2 flex items-center">
                      <img
                        src={product.product.image}
                        alt={product.product.name}
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <span>{product.product.name}</span>
                    </td>
                    <td className="p-2">
                    {formatPriceInINR(product.product.price)}
                     </td>
                    <td className="p-2 flex items-center">
                      <div className="flex items-center border rounded-lg">
                        <button
                          className="bg-blue-500 text-white p-1 rounded-l-lg hover:bg-blue-600 transition-colors duration-300"
                          onClick={() => handleQuantityChange(product.product._id, -1)}
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="text"
                          value={product.quantity}
                          readOnly
                          className="w-12 text-center border-none"
                          style={{ outline: 'none', borderRadius: '0' }}
                        />
                        <button
                          className="bg-blue-500 text-white p-1 rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
                          onClick={() => handleQuantityChange(product.product._id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-2">
                    {formatPriceInINR(product.product.price * product.quantity)}
                     </td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:underline flex items-center"
                        onClick={() => handleDelete(product.product._id)}
                      >
                        <FaTrash className="mr-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Side - Summary and Payment Gateway */}
      <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaDollarSign className="mr-2 text-lg" /> Summary
        </h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2 text-sm lg:text-lg">
            <span>Total Price:</span>
            <span className="font-bold">
            {formatPriceInINR(totalPrice)}
            </span>
          </div>
          <div className="flex justify-between mb-2 text-sm lg:text-lg text-red-500">
            <span>Discount:</span>
            <span className="font-bold">-
            {formatPriceInINR(discount)}
             </span>
          </div>
          <div className="border-t pt-4 text-sm lg:text-xl flex justify-between">
            <span className="font-semibold">Final Price:</span>
            <span className="font-bold">{formatPriceInINR(finalPrice)}</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MdPayment className="mr-2 text-lg" /> Payment Method
          </h3>
          <div className="space-y-2 text-sm lg:text-base">
            <label className="block flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              <FaCreditCard className="mr-2" /> Credit Card
            </label>
            <label className="block flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              <MdLocalShipping className="mr-2" /> PayPal
            </label>
            <label className="block flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              <FaDollarSign className="mr-2" /> Bank Transfer
            </label>
          </div>
        </div>

        <button onClick={makePayment}
          className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 text-sm lg:text-base"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
