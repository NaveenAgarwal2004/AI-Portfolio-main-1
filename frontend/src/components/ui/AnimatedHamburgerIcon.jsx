import React from 'react';

const AnimatedHamburgerIcon = ({ isOpen, className }) => {
  return (
    <div
      aria-label="Toggle menu"
      className={`relative w-6 h-6 focus:outline-none ${className}`}
      aria-expanded={isOpen}
    >
      <span
        className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
          isOpen ? 'rotate-45 top-2.5' : 'top-1'
        }`}
      />
      <span
        className={`block absolute h-0.5 w-6 bg-current transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'top-3'
        }`}
      />
      <span
        className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
          isOpen ? '-rotate-45 top-2.5' : 'top-5'
        }`}
      />
    </div>
  );
};

export default AnimatedHamburgerIcon;
