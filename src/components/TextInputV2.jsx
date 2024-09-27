import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

const TextInputV2 = ({
  className,
  type = 'text',
  register,
  placeholder,
  trailingIcon,
  disabled,
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const disabledClass = twMerge(
    disabled
      ? 'bg-[#F2F2F2] border border-[#BDBDBD]'
      : 'bg-white border border-dark-gray'
  );
  const errorClass = twMerge(error ? 'border-red-600' : '');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className={twMerge(
          'flex items-center, rounded-lg px-4 py-2',
          disabledClass,
          errorClass,
          className
        )}
      >
        <div className="w-full">
          <input
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
              'p-0 text-gray-900 bg-transparent text-sm focus:ring-0 border-0 w-full focus:outline-none'
            )}
            {...register}
          />
        </div>
        {type === 'password' && !trailingIcon && (
          <button
            type="button"
            className="flex items-center focus:border-none focus:outline-none"
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
      {error && <p className="mt-2 text-xs text-[#D32F2F]">{error}</p>}
    </>
  );
};

export default TextInputV2;
