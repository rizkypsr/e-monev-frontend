import React from 'react';

function Label({ children, className, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm text-dark-gray ${className}`}
    >
      {children}
    </label>
  );
}

export default Label;
