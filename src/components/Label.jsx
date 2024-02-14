import React from 'react';

const Label = ({ children, className, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm text-dark-gray ${className}`}
  >
    {children}
  </label>
);

export default Label;
