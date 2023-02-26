import React, { useState } from "react";

function Dropdown({ label, endLabel, children, onSelect, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const toggle = () => setIsOpen(!isOpen);
  function handleItemClick(value, children) {
    setSelectedValue(value);
    setSelectedLabel(children || value);
    onSelect({ value, label: children || value });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        id="dropdown-button"
        className="rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center shadow bg-white"
        onClick={toggle}
        type="button">
        {label}{" "}
        <span className="ml-2 text-primary">
          {selectedLabel ?? defaultValue}
        </span>
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
        <div className="ml-2">{endLabel}</div>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow">
          <ul className="text-sm">
            {React.Children.map(children, (child) => {
              if (child.type === Dropdown.Items) {
                return React.cloneElement(child, {
                  onSelect: handleItemClick,
                });
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Items({ children, onSelect }) {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onClick: () => onSelect(child.props.value, child.props.children),
        });
      })}
    </div>
  );
}

Dropdown.Items = Items;

export default Dropdown;
