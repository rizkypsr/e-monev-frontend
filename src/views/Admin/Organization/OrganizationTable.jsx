import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Table from "../../../components/Table";
import { useToastContext } from "../../../context/ToastContext";
import { baseUrl } from "../../../utils/constants";

function OrganizationTable() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const authHeader = useAuthHeader();
  const { showToast, toastMessage, hideToastMessage } = useToastContext();

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage, {
        onClose: hideToastMessage,
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  }, [showToast, toastMessage, hideToastMessage]);

  useEffect(() => {
    fetchData(0, pageSize);
  }, [pageSize]);

  async function fetchData(offset, limit) {
    try {
      const response = await fetch(
        `${baseUrl}/org/list?offset=${offset}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        }
      );
      const jsonData = await response.json();
      setData(jsonData.data.result);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.code, {
      id: "code",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Kode</span>,
    }),
    columnHelper.accessor((row) => row.title, {
      id: "title",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Organisasi</span>,
    }),
    columnHelper.accessor((row) => row.aksi, {
      id: "aksi",
      size: 10,
      cell: (props) => {
        const rowId = props.row.original.id;
        return (
          <div className="flex justify-end">
            <Link to={`edit/${rowId}`}>
              <Button
                className="text-sm font-normal"
                textColor="text-blue-500"
                icon={<PencilIcon className="w-4 h-4" />}>
                Edit
              </Button>
            </Link>
            <Link to={`detail/${rowId}`}>
              <Button
                className="text-sm font-normal"
                textColor="text-blue-500"
                icon={<EyeIcon className="w-4 h-4" />}>
                Lihat
              </Button>
            </Link>
            <Button
              className="text-sm font-normal"
              textColor="text-red-500"
              icon={<TrashIcon className="w-4 h-4" />}>
              Hapus
            </Button>
          </div>
        );
      },
      header: () => <div className="text-right">Aksi</div>,
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
        <h1 className="text-2xl font-semibold">Organisasi</h1>
        <Link to="create">
          <Button
            background="bg-primary"
            textColor={"text-white"}
            icon={<PlusIcon className="w-4 h-4" />}>
            Tambah Organisasi
          </Button>
        </Link>
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
            <MagnifyingGlassIcon className="w-4 h-4" />
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
        <Table
          className="mt-6"
          table={table}
          columns={columns}
          data={data}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default OrganizationTable;
