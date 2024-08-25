import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg animate-fade-in">
      <div className="flex flex-col items-center bg-blue-600 text-white p-4 rounded-lg w-24 sm:w-28 md:w-32 lg:w-36">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.days || 0}</span>
        <span className="text-xs sm:text-sm">Days</span>
      </div>
      <div className="flex flex-col items-center bg-green-600 text-white p-4 rounded-lg w-24 sm:w-28 md:w-32 lg:w-36">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.hours || 0}</span>
        <span className="text-xs sm:text-sm">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-yellow-600 text-white p-4 rounded-lg w-24 sm:w-28 md:w-32 lg:w-36">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.minutes || 0}</span>
        <span className="text-xs sm:text-sm">Minutes</span>
      </div>
      <div className="flex flex-col items-center bg-red-600 text-white p-4 rounded-lg w-24 sm:w-28 md:w-32 lg:w-36">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.seconds || 0}</span>
        <span className="text-xs sm:text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
