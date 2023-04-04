import PropTypes from 'prop-types';
import React from 'react';
import CountUp from 'react-countup';

export default function CountBox({ count, color, hoverColor }) {
  return (
    <div
      className={`sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:${hoverColor}`}
    >
      <div className="w-12 h-12 rounded-lg" style={{ background: color }} />
      <div>
        <h2 className="font-semibold text-lg">
          <CountUp end={count} duration={0.7} />
        </h2>
        <h3 className="text-sm">URUSAN</h3>
      </div>
    </div>
  );
}

CountBox.propTypes = {
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
};
