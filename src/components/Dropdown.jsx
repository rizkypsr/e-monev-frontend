import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Dropdown({
  className,
  dropdownStyle,
  minWidth,
  label,
  endLabel,
  labelPosition,
  children,
  onSelect,
  selectedItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    setSelectedLabel(selectedItem.label);
  }, [selectedItem]);

  const toggle = () => setIsOpen(!isOpen);

  function handleItemClick(newValue, newLabel) {
    setSelectedLabel(newLabel);
    onSelect({ newValue, newLabel });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        style={minWidth && { minWidth }}
        className={`rounded-lg px-4 text-sm py-2.5 w-full text-center bg-white inline-flex items-center ${className} ${
          labelPosition === 'right' ? 'justify-center' : 'justify-between'
        } ${dropdownStyle === 'fill' ? 'shadow' : 'border border-dark-gray'}`}
        onClick={toggle}
        type="button"
      >
        <span className={`${dropdownStyle === 'fill' && 'flex-grow'}`}>
          {labelPosition === 'right' ? label : selectedLabel ?? label}
        </span>
        {labelPosition === 'right' && (
          <span className="text-center text-primary mx-1">{selectedLabel}</span>
        )}
        {isOpen ? (
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

        {endLabel && <div className="ml-2">{endLabel}</div>}
      </button>
      {isOpen && (
        <div className="absolute z-10 left-0 right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow max-h-96 overflow-auto">
          <ul className="text-sm">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onSelect: handleItemClick,
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function Items({ children, onSelect }) {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onClick: () => onSelect(child.props.value, child.props.children),
        })
      )}
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  minWidth: PropTypes.string,
  dropdownStyle: PropTypes.string,
  label: PropTypes.string.isRequired,
  endLabel: PropTypes.string,
  labelPosition: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }).isRequired,
};

Dropdown.defaultProps = {
  className: null,
  dropdownStyle: 'fill',
  minWidth: null,
  endLabel: null,
  labelPosition: 'right',
};

Items.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
};

Items.defaultProps = {
  onSelect: null,
};

Dropdown.Items = Items;

export default Dropdown;
