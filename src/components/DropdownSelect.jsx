import React, { cloneElement, useEffect, useRef, useState } from 'react';

const DropdownSelect = ({
  className,
  minWidth,
  options,
  value,
  onChange,
  children,
}) => {
  const dropdownRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const onHandleChange = (selectedValue) => {
    onChange(selectedValue);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false); // Clicked outside the dropdown, so hide options
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`cursor-pointer relative ${className}`}
      style={{ maxWidth: '30rem', minWidth }}
      onClick={toggleShowOptions}
    >
      {/* Header */}
      {cloneElement(children, { value, showOptions })}

      {showOptions && (
        <div className="overflow-y-auto z-10 bg-white rounded-lg shadow-md mt-1 absolute w-full px-4 py-2.5 max-h-80">
          <ul className="flex flex-col space-y-2">
            {options.map((option) => (
              <li
                key={option.value}
                className="hover:text-primary"
                onClick={() => onHandleChange(option)}
              >
                {option.label || option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const HeaderV1 = ({ label, endLabel, value, showOptions }) => (
  <div className="bg-white shadow rounded-lg px-4 text-sm py-2.5 flex items-center space-x-2 w-full">
    <div className="flex space-x-1 items-center">
      <div>{label}</div>
      <div className="text-primary">{value.label}</div>
    </div>

    <div>
      {showOptions ? (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </div>

    {endLabel && <div>{endLabel}</div>}
  </div>
);

const HeaderV2 = ({ label, endLabel, value, showOptions }) => (
  <div className="bg-white justify-center shadow rounded-lg px-4 text-sm py-2.5 flex items-center space-x-2 w-full">
    <div className="flex space-x-1 items-center">
      <div>{value?.label || value?.name || `--- ${label} ---`}</div>
    </div>

    <div>
      {showOptions ? (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </div>

    {endLabel && <div>{endLabel}</div>}
  </div>
);

DropdownSelect.HeaderV1 = HeaderV1;
DropdownSelect.HeaderV2 = HeaderV2;

export default DropdownSelect;
