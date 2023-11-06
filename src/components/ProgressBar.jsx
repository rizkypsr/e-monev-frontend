import React, { useMemo } from 'react';
import formatRupiah from '../utils/formatRupiah';

const ProgressBar = ({ label, completed, total }) => {
  const percentage = useMemo(
    () => ((completed / total) * 100).toFixed(1),
    [completed, total]
  );

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center text-[#333333]">
        <span className="font-semibold capitalize">{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="flex w-full justify-between items-center text-[#333333] mb-2 text-xl">
        <span className="font-semibold">
          {formatRupiah(completed.toString())}
        </span>
        <span>{formatRupiah(total.toString())}</span>
      </div>
      <div className="w-full rounded-full overflow-hidden bg-[#F2F2F2] min-h-[12px]">
        <div
          className="min-h-[12px] bg-[#2F80ED] text-white text-center"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
