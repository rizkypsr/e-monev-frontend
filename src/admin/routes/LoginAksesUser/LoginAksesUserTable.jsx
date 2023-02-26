import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import Pagination from "../../components/Pagination";
import { Table, Button } from "flowbite-react";
import Dropdown from "../../components/Dropdown";
import { ReactComponent as SearchLogo } from "../../../assets/icons/search.svg";

function LoginAksesUserTable() {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState(() => makeData(1000));
  const [sorting, setSorting] = useState([]);
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.username, {
      id: "username",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Username</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("nama", {
      header: () => "Nama OPD",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("level", {
      header: () => <span>Level User</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("aksi", {
      header: "Aksi",
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    debugTable: true,
  });

  function onPageSizeChanged({ value, label }) {
    table.setPageSize(Number(value));
  }

  function onSorting({ value, label }) {
    table
      .getHeaderGroups()[0]
      .headers[0].column.toggleSorting(value === "desc");
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
        <Button className="bg-primary hover:bg-secondary">
          <div className="w-5 h-5">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
          Tambah
        </Button>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-3">
          {/* Sorting Dropdown */}
          <div>
            <Dropdown
              onSelect={onSorting}
              defaultValue="A - Z"
              label="Urutkan:">
              <Dropdown.Items>
                <li
                  value="asc"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100">
                  A - Z
                </li>
                <li
                  value="desc"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100">
                  Z - A
                </li>
              </Dropdown.Items>
            </Dropdown>
          </div>

          {/* Page Size Dropdown */}
          <div>
            <Dropdown
              onSelect={onPageSizeChanged}
              defaultValue="10"
              label="Tampilkan:"
              endLabel="Entri">
              <Dropdown.Items>
                <li
                  value="10"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100">
                  10
                </li>
                <li
                  value="50"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100">
                  50
                </li>
                <li
                  value="100"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100">
                  100
                </li>
              </Dropdown.Items>
            </Dropdown>
          </div>
        </div>

        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchLogo />
          </div>
          <input
            type="search"
            id="search"
            className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
            placeholder="Pencarian"
          />
        </div>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg">
        <Table hoverable={true}>
          <Table.Head className="bg-white">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <Table.HeadCell
                  key={header.id}
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : "",
                    onClick: table
                      .getHeaderGroups()[0]
                      .headers[0].column.getToggleSortingHandler(),
                  }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.HeadCell>
              ))
            )}
          </Table.Head>
          <Table.Body
            className="overflow-hidden divide-y"
            style={{ height: "100px" }}>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
          <tfoot>
            <tr>
              <Table.Cell colSpan={5}>
                <Pagination
                  table={table}
                  dataLength={data.length}
                />
              </Table.Cell>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}

export default LoginAksesUserTable;
