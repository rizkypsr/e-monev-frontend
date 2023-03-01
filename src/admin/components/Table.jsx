import { flexRender } from "@tanstack/react-table";
import React from "react";
import Pagination from "./Pagination";

function Table({ children, className, table, data, columns }) {
  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-md ${className}`}>
      <table className="w-full text-sm text-left text-dark-gray">
        <thead className="bg-white border-b">
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3">
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
                  className="pl-6 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="text-xs text-dark-gray border-t bg-white">
          <tr className="border-b">
            <td
              colSpan={5}
              className="px-6 py-3">
              <Pagination
                table={table}
                dataLength={data.length}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
