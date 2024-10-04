import React from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import ReactLoading from './Loading';

const ButtonV2 = ({
  className,
  type,
  icon,
  loading,
  onClick,
  disabled,
  children,
}) => {
  const iconClass = icon ? 'flex items-center justify-center space-x-2' : '';

  if (type === 'modal') {
    return (
      <div
        onClick={onClick}
        aria-hidden="true"
        className={twMerge(className, iconClass)}
      >
        {icon}
        <span>{children}</span>
      </div>
    );
  }

  return (
    <button
      type={type}
      className={twMerge(
        className,
        iconClass,
        'font-medium rounded-lg text-sm min-w-fit px-3 py-2.5 h-10',
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-primary text-white'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {!loading && icon}
      {loading ? (
        <ReactLoading color="#ffffff" />
      ) : (
        children && <span>{children}</span>
      )}
    </button>
  );
};

ButtonV2.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

ButtonV2.defaultProps = {
  className: null,
  type: 'button',
  icon: null,
  onClick: null,
  disabled: false,
  children: null,
};

export default ButtonV2;
