import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from './Loading';

const Table = ({ className, columns, rows, isLoading }) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => rows?.data?.result, [rows]);

  const table = useReactTable({
    columns: columnData,
    data: rowData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    meta: {
      currentPage: rows?.data?.page,
    },
  });

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-sm text-left text-dark-gray">
        <thead className="bg-white border-b">
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 font-medium text-[#4F4F4F] text-sm leading-5"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-white border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="pl-6 pr-3 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

Table.defaultProps = {
  className: null,
  isLoading: false,
};

export default Table;
