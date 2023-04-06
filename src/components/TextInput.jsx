import PropTypes from 'prop-types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

export default function TextInput({
  className,
  type,
  name,
  placeholder,
  value,
  required,
  disabled,
  trailingIcon,
  error,
  onChange,
  onKeyDown,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const type = props.type || 'text';

  return (
    <>
      <div className={`relative ${className}`}>
        {type === 'password' && !trailingIcon && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:border-none focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="w-4 h-4 text-dark-gray" />
            ) : (
              <EyeSlashIcon className="w-4 h-4 text-dark-gray" />
            )}
          </button>
        )}
        <input
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`${
            disabled
              ? 'bg-[#F2F2F2] border border-[#BDBDBD]'
              : 'bg-white border border-dark-gray'
          } text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5 ${
            error ? 'border-red-600' : ''
          }`}
          required={required}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  trailingIcon: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  className: null,
  type: 'text',
  name: null,
  required: false,
  disabled: false,
  trailingIcon: false,
  error: null,
  placeholder: null,
  onChange: null,
  onKeyDown: null,
};
