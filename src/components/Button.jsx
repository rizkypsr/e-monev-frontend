import React from 'react';

function Button({
  children,
  className,
  type = 'button',
  icon = null,
  onClick = null,
  background,
  textColor,
}) {
  return type === 'modal' ? (
    <div
      onClick={onClick}
      aria-hidden="true"
      className={`font-medium rounded-lg text-sm px-3 min-w-fit py-2.5 ${
        icon ? 'flex items-center justify-center space-x-2' : ''
      } ${background || 'bg-transparent'} ${className} ${textColor ?? 'text-dark-gray'}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  ) : (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={`font-medium rounded-lg text-sm px-3 min-w-fit py-2.5 ${
        icon ? 'flex items-center justify-center space-x-2' : ''
      } ${background || 'bg-transparent'} ${className} ${textColor ?? 'text-dark-gray'}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default Button;
