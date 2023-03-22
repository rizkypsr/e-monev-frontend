import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../../components/DialogContent";
import Table from "../../../components/Table";
import { useToastContext } from "../../../context/ToastContext";
import TrashImg from "../../../assets/images/trash.png";
import { deleteOccasion, getOccasions } from "../../../api/admin/occasion";
import showToast from "../../../utils/showToast";
import showToastMessage from "../../../utils/showToast";
import Pagination from "../../../components/Pagination";
import Dropdown from "../../../components/Dropdown";
import ErrorPage from "../../ErrorPage";

function OccasionTable() {
  const authHeader = useAuthHeader();

  const [error, setError] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  const [pageData, setCurrentPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalData: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resetPage, setResetPage] = useState(false);
  const { hideToastMessage } = useToastContext();

  useEffect(() => {
    setCurrentPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    fetchOccasions(0, pageSize, currentPage);
  }, [currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
    setResetPage((prevState) => !prevState);
    setCurrentPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    fetchOccasions(0, pageSize, currentPage);
  }, [search]);

  async function fetchOccasions(offset, limit, pageNumber) {
    try {
      const occasionsData = await getOccasions(
        authHeader,
        offset,
        limit,
        pageNumber,
        search
      );
      setCurrentPageData({
        rowData: occasionsData.result,
        isLoading: false,
        totalPages: occasionsData.pages,
        totalData: occasionsData.total,
      });
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteOccasionData(id) {
    try {
      const deleteResponse = await deleteOccasion(authHeader, id);
      fetchOccasions(0, pageSize);

      showToastMessage("success", deleteResponse, hideToastMessage);
    } catch (error) {
      setError(error.message);
      showToastMessage("error", error.message, hideToastMessage);
    }
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
    }),
    columnHelper.accessor((row) => row.code, {
      id: "code",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Kode</span>,
    }),
    columnHelper.accessor((row) => row.title, {
      id: "title",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Urusan</span>,
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
                icon={<PencilIcon className="w-4 h-4" />}
              >
                Edit
              </Button>
            </Link>
            <Link to={`detail/${rowId}`}>
              <Button
                className="text-sm font-normal"
                textColor="text-blue-500"
                icon={<EyeIcon className="w-4 h-4" />}
              >
                Lihat
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger>
                <Button
                  className="text-sm font-normal"
                  type="modal"
                  textColor="text-red-500"
                  icon={<TrashIcon className="w-4 h-4" />}
                >
                  Hapus
                </Button>
              </DialogTrigger>

              <DialogContent className="py-12 w-1/3">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="p-6 bg-[#FFDADA] w-fit rounded-lg">
                    <img src={TrashImg} />
                  </div>

                  <div>
                    <h1 className="mt-6 font-semibold text-lg leading-7 text-dark-gray">
                      Apakah Anda yakin menghapus ini?
                    </h1>
                    <div className="flex space-x-3 justify-center">
                      <DialogClose>
                        <Button
                          onClick={() => deleteOccasionData(rowId)}
                          className="w-full md:w-28 mt-8 border border-[#EB5757]"
                          type="modal"
                          background="bg-white"
                          textColor="text-[#EB5757]"
                        >
                          Ya, hapus
                        </Button>
                      </DialogClose>
                      <DialogClose>
                        <Button
                          className="w-full md:w-28 mt-8"
                          type="modal"
                          background="bg-primary"
                          textColor="text-white"
                        >
                          Batal
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
      header: () => <div className="text-right">Aksi</div>,
    }),
  ];

  async function onPageSizeChanged({ value, label }) {
    setCurrentPage(1);
    setResetPage((prevState) => !prevState);
    setPageSize(Number(value));
  }

  // function onSorting({ value, label }) {
  //   table
  //     .getHeaderGroups()[0]
  //     .headers[0].column.toggleSorting(value === "desc");
  // }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Urusan</h1>
        <Link to="create">
          <Button
            background="bg-primary"
            textColor={"text-white"}
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Tambah Urusan
          </Button>
        </Link>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-3">
          {/* Sorting Dropdown */}
          {/* <div>
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
          </div> */}

          {/* Page Size Dropdown */}
          <div>
            <Dropdown
              onSelect={onPageSizeChanged}
              defaultValue="10"
              label="Tampilkan:"
              endLabel="Entri"
            >
              <Dropdown.Items>
                <li
                  value="10"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100"
                >
                  10
                </li>
                <li
                  value="50"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100"
                >
                  50
                </li>
                <li
                  value="100"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100"
                >
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
            placeholder="Pencarian"
          />
        </div>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg">
        <Table
          columns={columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />

        <Pagination
          totalRows={pageData.totalData}
          pageChangeHandler={setCurrentPage}
          rowsPerPage={pageSize}
          resetPage={resetPage}
        />
      </div>
    </>
  );
}

export default OccasionTable;
