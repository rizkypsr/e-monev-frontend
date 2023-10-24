import React from 'react';

const ThreeDot = () => {
  const dots = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="w-2 h-2 bg-gray-300 rounded-full mx-1" />
  ));

  return <div className="flex items-center">{dots}</div>;
};

export default ThreeDot;
