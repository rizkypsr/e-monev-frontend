import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

const DebouncedInput = ({
  initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-4 h-4" />
      </div>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
        placeholder="Pencarian"
      />
    </>
  );
};

export default DebouncedInput;
