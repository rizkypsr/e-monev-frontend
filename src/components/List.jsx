import PropTypes from 'prop-types';
import React from 'react';

function List({ name, data, onSelectValue }) {
  const handleSelectValue = (value, propName) => {
    onSelectValue(value, propName);
  };

  return (
    <div
      className="text-sm font-medium capitalize text-dark-gray"
      style={{ maxHeight: '32rem' }}
    >
      {data.length > 0 ? (
        data.map((item, index) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="button"
            className="w-full py-3 text-left border-b border-[#E0E0E0] capitalize"
            onClick={() => handleSelectValue(item, name)}
          >
            {item.title ? item.title : item.name}
          </button>
        ))
      ) : (
        <div>Tidak ada Data</div>
      )}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  name: PropTypes.string.isRequired,
  onSelectValue: PropTypes.func.isRequired,
};

export default List;
