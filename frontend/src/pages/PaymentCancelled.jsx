import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Import a cancel icon from Font Awesome pack in react-icons

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Fade-in animation */}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-6 animate-fade-in">
        {/* Icon and Title with shake animation */}
        <div className="flex items-center justify-center space-x-3 animate-shake">
          <FaTimesCircle className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
        </div>

        {/* Cancel Message */}
        <p className="text-center text-gray-600">
          Your payment has been cancelled. If you wish to try again, please click the button below.
        </p>

        {/* Only "Try Again" Button */}
        <div className="flex flex-col space-y-2">
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
