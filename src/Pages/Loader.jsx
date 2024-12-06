// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce animation-delay-200"></div>
        <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce animation-delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
