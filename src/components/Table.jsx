import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

function Table({ isLoading, className, data, columns, pagination }) {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);

  const table = useReactTable({
    columns: columnData,
    data: rowData,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div
      className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-sm text-left text-dark-gray">
        <thead className="bg-white border-b">
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 font-medium text-[#4F4F4F] text-sm leading-5">
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
            <tr
              key={row.id}
              className="bg-white border-b">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="pl-6 pr-3 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot className="text-xs text-dark-gray border-t bg-white">
          <tr className="border-b">
            <td
              colSpan={5}
              className="px-6 py-3">
              {pagination}
            </td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default Table;
