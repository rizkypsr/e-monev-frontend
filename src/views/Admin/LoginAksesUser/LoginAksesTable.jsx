import React, { useCallback, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import Dropdown from '../../../components/Dropdown';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import TrashImg from '../../../assets/images/trash.png';
import { deleteUser, getUsers } from '../../../api/admin/user';
import Pagination from '../../../components/Pagination';
import ErrorPage from '../../ErrorPage';
import { useToastContext } from '../../../context/ToastContext';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.username, {
    id: 'username',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Username</span>,
  }),
  columnHelper.accessor((row) => row.organization.title, {
    id: 'organization',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nama OPD</span>,
  }),
  columnHelper.accessor('admin_role_id', {
    header: () => <span>Level User</span>,
    cell: (info) => (info.renderValue() === 1 ? 'Super Admin' : 'User OPD'),
  }),
  columnHelper.accessor((row) => row.aksi, {
    id: 'aksi',
    size: 10,
    cell: (props, deleteUserData) => {
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
                  <img src={TrashImg} alt="Hapus" />
                </div>

                <div>
                  <h1 className="mt-6 font-semibold text-lg leading-7 text-dark-gray">
                    Apakah Anda yakin menghapus ini?
                  </h1>
                  <div className="flex space-x-3 justify-center">
                    <DialogClose>
                      <Button
                        onClick={() => deleteUserData(rowId)}
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

function LoginAksesTable() {
  const [error, setError] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [pageData, setCurrentPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalData: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resetPage, setResetPage] = useState(false);
  const [sorting, setSorting] = useState({
    value: 'terbaru',
    label: 'Terbaru',
  });

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();

  async function fetchUsers(offset, limit, pageNumber, sort) {
    try {
      const usersData = await getUsers(authHeader, {
        offset,
        limit,
        page: pageNumber,
        search,
        sort,
      });
      setCurrentPageData({
        rowData: usersData.result,
        isLoading: false,
        totalPages: usersData.pages,
        totalData: usersData.total,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  const deleteUserData = async (userId) => {
    try {
      const deleteResponse = await deleteUser(authHeader, userId);
      fetchUsers(0, pageSize, currentPage, sorting.value);

      showToastMessage(deleteResponse);
    } catch (err) {
      showToastMessage(err.message, 'error');
    }
  };

  useEffect(() => {
    setCurrentPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    fetchUsers(0, pageSize, currentPage, sorting.value);
  }, [currentPage, pageSize, sorting]);

  useEffect(() => {
    setCurrentPage(1);
    setResetPage((prevState) => !prevState);
    setCurrentPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    fetchUsers(0, pageSize, currentPage, sorting.value);
  }, [search]);

  const onPageSizeChanged = useCallback(
    ({ newValue }) => {
      setCurrentPage(1);
      setResetPage((prevState) => !prevState);
      setPageSize(Number(newValue));
    },
    [setCurrentPage, setResetPage, setPageSize]
  );

  const onSorting = useCallback(
    ({ newValue, newLabel }) => {
      setSorting({ value: newValue, label: newLabel });
    },
    [setSorting]
  );

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
        <Link to="create">
          <Button
            background="bg-primary"
            textColor="text-white"
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Tambah User
          </Button>
        </Link>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-3">
          {/* Sorting Dropdown */}
          <div>
            <Dropdown
              onSelect={onSorting}
              label="Urutkan:"
              selectedItem={sorting}
            >
              <Dropdown.Items>
                <li
                  value="terbaru"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100"
                >
                  Terbaru
                </li>
                <li
                  value="terlama"
                  className="block px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100"
                >
                  Terlama
                </li>
              </Dropdown.Items>
            </Dropdown>
          </div>

          {/* Page Size Dropdown */}
          <div>
            <Dropdown
              onSelect={onPageSizeChanged}
              label="Tampilkan:"
              endLabel="Entri"
              selectedItem={{
                value: pageSize.toString(),
                label: pageSize.toString(),
              }}
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
          columns={columns.map((column) =>
            column.cell
              ? {
                  ...column,
                  cell: (props) => column.cell(props, deleteUserData),
                }
              : column
          )}
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

export default LoginAksesTable;
