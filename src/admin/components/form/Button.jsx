import React from "react";

function Button({ children, className, icon, onClick, background, textColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-medium rounded-lg text-sm px-3 min-w-fit py-2.5 ${
        icon && "flex items-center space-x-2"
      } ${background ? background : "bg-transparent"} ${className} ${
        textColor ?? "text-dark-gray"
      }`}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default Button;
