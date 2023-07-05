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
  leadingIcon,
  trailingIcon,
  error,
  onChange,
  onKeyDown,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-lg pr-2 ${
          disabled
            ? 'bg-[#F2F2F2] border border-[#BDBDBD]'
            : 'bg-white border border-dark-gray'
        } ${error ? 'border-red-600' : ''} ${className}`}
      >
        <div className="flex items-center w-full">
          {leadingIcon && <p className="text-sm ml-3">Rp</p>}
          <input
            type={showPassword ? 'text' : type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={` text-gray-900 bg-transparent text-sm focus:ring-0 border-0 w-full`}
            required={required}
          />
        </div>
        {type === 'password' && !trailingIcon && (
          <button
            type="button"
            className="flex items-center pr-3 focus:border-none focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="w-4 h-4 text-dark-gray" />
            ) : (
              <EyeSlashIcon className="w-4 h-4 text-dark-gray" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  leadingIcon: PropTypes.bool,
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
  value: '',
  required: false,
  disabled: false,
  leadingIcon: false,
  trailingIcon: false,
  error: null,
  placeholder: null,
  onChange: null,
  onKeyDown: null,
};
