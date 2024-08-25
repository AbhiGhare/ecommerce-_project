import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PqzylF3Gw8WOVEszq0jJNerrtxK8hRYteyFXddZKmrUzodpMX5yglJiDLU7iudwy1ITLeoY11PrfOwUYWDgbFe800FWObyiB9');

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
