import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

function TextInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const type = props.type || 'text';

  return (
    <>
      <div className={`relative ${props.className}`}>
        {props.type === 'password' && !props.disableIcon && (
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
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          className={`${
            props.disabled
              ? 'bg-[#F2F2F2] border border-[#BDBDBD]'
              : 'bg-white border border-dark-gray'
          } text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5 ${
            props.error ? 'border-red-600' : ''
          }`}
          required={props.required}
        />
      </div>
      {props.error && (
        <p className="mt-2 text-xs text-red-600">{props.error}</p>
      )}
    </>
  );
}

export default TextInput;
