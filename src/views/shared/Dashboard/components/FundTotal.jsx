import { BanknotesIcon } from '@heroicons/react/24/solid';
import React from 'react';

const FundTotal = ({ title, color, total }) => (
  <div className="flex items-center space-x-3">
    <div
      className={`w-14 h-14 flex justify-center items-center p-3 rounded-md ${color}`}
    >
      <BanknotesIcon color="#ffffff" />
    </div>
    <div>
      <h1 className="font-medium">{title}</h1>
      <div className="text-2xl font-semibold">{total}</div>
    </div>
  </div>
);

export default FundTotal;
