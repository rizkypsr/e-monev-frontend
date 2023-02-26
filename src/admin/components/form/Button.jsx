import React from "react";

function Button({ children, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-28 text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      {icon}
      {children}
    </button>
  );
}

export default Button;
