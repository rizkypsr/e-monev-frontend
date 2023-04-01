import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Dropdown({ label, endLabel, children, onSelect, selectedItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(selectedItem.label);

  const toggle = () => setIsOpen(!isOpen);

  function handleItemClick(newValue, newLabel) {
    setSelectedLabel(newLabel);
    onSelect({ newValue, newLabel });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        id="dropdown-button"
        className="rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center shadow bg-white"
        onClick={toggle}
        type="button"
      >
        {label} <span className="ml-2 text-primary">{selectedLabel}</span>
        <svg
          className="w-4 h-4 ml-2"
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
        <div className="ml-2">{endLabel}</div>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow">
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
  label: PropTypes.string.isRequired,
  endLabel: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

Dropdown.defaultProps = {
  endLabel: '',
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
