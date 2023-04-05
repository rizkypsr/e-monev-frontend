import PropTypes from 'prop-types';
import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

export default function CountBox({ className, linkTo, title, count, color }) {
  return (
    <Link
      to={linkTo}
      className={`sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg ${className}`}
    >
      <div className="w-12 h-12 rounded-lg" style={{ background: color }} />
      <div>
        <h2 className="font-semibold text-lg">
          <CountUp end={count} duration={0.7} />
        </h2>
        <h3 className="text-sm uppercase">{title}</h3>
      </div>
    </Link>
  );
}

CountBox.propTypes = {
  className: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
