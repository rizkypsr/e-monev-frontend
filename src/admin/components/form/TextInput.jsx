import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

function TextInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative ${props.className}`}>
      {props.type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 focus:border-none focus:outline-none"
          onClick={togglePasswordVisibility}>
          {showPassword ? (
            <EyeIcon className="w-4 h-4 text-dark-gray" />
          ) : (
            <EyeSlashIcon className="w-4 h-4 text-dark-gray" />
          )}
        </button>
      )}
      <input
        id={props.id}
        type={showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        className={`bg-white border border-dark-gray text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5 ${
          props.error && "border-red-600"
        }`}
        required={props.required}
      />
      {props.errorText && (
        <p class="mt-2 text-xs text-red-600">
          Username yang Anda masukkan tidak tersedia
        </p>
      )}
    </div>
  );
}

export default TextInput;
