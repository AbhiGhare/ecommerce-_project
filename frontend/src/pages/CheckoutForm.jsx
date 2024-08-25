import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Cards from 'react-credit-cards';
import axios from 'axios';
import 'react-credit-cards/es/styles-compiled.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardDetails((prevDetails) => ({ ...prevDetails, focus: e.target.name }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data: { clientSecret } } = await axios.post(`${import.meta.env.VITE_API_URL}/payments/create-payment-intent`, {
      amount: 50 // Example amount, replace with your value
    });

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        // card: elements.getElement(CardElement),
        card: cardDetails,
      }
    });

    if (payload.error) {
      console.error("Payment failed", payload.error);
    } else {
      console.log("Payment succeeded", payload.paymentIntent);
      setPaymentSucceeded(true);
    }
  };

  return (
    <div className="checkout-form max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <Cards
        number={cardDetails.number}
        name={cardDetails.name}
        expiry={cardDetails.expiry}
        cvc={cardDetails.cvc}
        focused={cardDetails.focus}
        className="mb-4"
      />

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="16"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={cardDetails.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4 flex space-x-4">
          <input
            type="tel"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CardElement from Stripe to handle actual payment */}
        {/* <div className="mb-4">
          <CardElement className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div> */}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Pay
        </button>
        {paymentSucceeded && <p className="mt-4 text-green-500">Payment Succeeded!</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
