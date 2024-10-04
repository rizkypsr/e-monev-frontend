import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

const FundTotal = ({ className, title, total }) => (
  <div className="flex justify-between items-center space-x-3 w-72">
    <div
      className={twMerge(
        'w-14 h-14 flex justify-center items-center p-3 rounded-md',
        className
      )}
    >
      <BanknotesIcon color="#ffffff" />
    </div>
    <div className="grow">
      <h1 className="text-2xl font-medium">{title}</h1>
      <div className="text-2xl font-semibold">{total}</div>
    </div>
  </div>
);

export default FundTotal;
