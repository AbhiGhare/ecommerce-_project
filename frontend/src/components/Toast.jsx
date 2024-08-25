import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

const Toast = ({ message, show, type = 'success', duration = 3000 }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 250, friction: 20 },
  });

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        // When the toast should be dismissed, this prop should be managed by the parent component.
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <>
      {transitions((styles, item) =>
        item ? (
          <animated.div
            style={styles}
            className={`fixed bottom-5 right-5 max-w-xs w-full border border-gray-300 rounded-lg shadow-lg p-4 ${
              type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            } z-50`} // Tailwind CSS z-index class
          >
            {message}
          </animated.div>
        ) : null
      )}
    </>
  );
};

export default Toast;
