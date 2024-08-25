import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import an icon from Font Awesome pack in react-icons

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Fade-in animation */}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-6 animate-fade-in">
        {/* Icon and Title with bounce animation */}
        <div className="flex items-center justify-center space-x-3 animate-bounce">
          <FaCheckCircle className="h-12 w-12 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        </div>

        {/* Success Message */}
        <p className="text-center text-gray-600">
          Thank you for your purchase! Your transaction has been successfully completed.
        </p>

        {/* Only Shop More Button */}
        <div className="flex flex-col space-y-2">
          <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200">
            Shop More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
