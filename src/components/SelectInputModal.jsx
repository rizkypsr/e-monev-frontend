import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';

function SelectInputModal({ className, selectedValue, label }) {
  return (
    <div
      className={`flex text-sm items-center justify-between border border-dark-gray rounded-lg p-2.5 leading-4 text-dark-gray capitalize w-full ${className}`}
    >
      <span>{selectedValue || label}</span>
      <ChevronDownIcon className="w-3 h-3" />
    </div>
  );
}

export default SelectInputModal;
