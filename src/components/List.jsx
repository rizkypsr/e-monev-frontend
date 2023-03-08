import React from "react";

function List({ data, onSelectValue }) {
  const handleSelectValue = (value) => {
    onSelectValue(value);
  };

  return (
    <div
      className="text-sm font-medium capitalize text-dark-gray overflow-y-scroll max-h-9"
      style={{ maxHeight: "32rem" }}>
      {data.map((item, index) => {
        return (
          <button
            key={index}
            type="button"
            className="w-full py-3 text-left border-b border-[#E0E0E0]"
            onClick={() => handleSelectValue(item)}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default List;
