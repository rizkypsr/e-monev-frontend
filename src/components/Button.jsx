import PropTypes from 'prop-types';
import React from 'react';

const Button = ({
  children,
  className,
  type,
  icon,
  onClick,
  background,
  textColor,
}) =>
  type === 'modal' ? (
    <div
      onClick={onClick}
      aria-hidden="true"
      className={`font-medium rounded-lg text-sm px-3 min-w-fit py-2.5 ${
        icon ? 'flex items-center justify-center space-x-2' : ''
      } ${className} ${background}  ${textColor}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  ) : (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={`font-medium rounded-lg text-sm min-w-fit px-3 py-2.5 h-10 ${
        icon ? 'flex items-center justify-center space-x-2' : ''
      } ${background || 'bg-transparent'} ${className} ${textColor}`}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );

Button.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  textColor: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  background: 'bg-transparent',
  children: null,
  className: null,
  icon: null,
  onClick: null,
  textColor: 'text-dark-gray',
  type: 'button',
};

export default Button;
