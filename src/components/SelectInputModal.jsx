import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';

function SelectInputModal({ className, selectedValue, label, error }) {
  return (
    <>
      <div
        className={`flex text-sm items-center justify-between border border-dark-gray rounded-lg p-2.5 leading-4 text-dark-gray capitalize w-full ${className} ${
          error ? 'border-red-600' : ''
        }`}
      >
        <span>{selectedValue || label}</span>
        <ChevronDownIcon className="w-3 h-3" />
      </div>
      {error && <p className="mt-2 text-xs text-red-600 text-left">{error}</p>}
    </>
  );
}

SelectInputModal.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
};

SelectInputModal.defaultProps = {
  className: null,
  error: null,
  selectedValue: null,
};

export default SelectInputModal;
