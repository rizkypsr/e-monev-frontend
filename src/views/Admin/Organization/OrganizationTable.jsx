import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getOrganizations } from '../../../api/admin/organization';
import deleteOrganization from '../../../api/admin/organization/deleteOrganization';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import Pagination from '../../../components/Pagination';
import Table from '../../../components/Table';
import { useToastContext } from '../../../context/ToastContext';
import TrashImg from '../../../assets/images/trash.png';
import ErrorPage from '../../ErrorPage';
import DropdownSelect from '../../../components/DropdownSelect';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor((row, index) => index + 1, {
    id: 'no',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>No</span>,
  }),
  columnHelper.accessor((row) => row.code, {
    id: 'code',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Kode</span>,
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => <i>{info.getValue().toUpperCase()}</i>,
    header: () => <span>Organisasi</span>,
  }),
  columnHelper.accessor((row) => row.aksi, {
    id: 'aksi',
    size: 10,
    cell: (props, deleteOccasionData) => {
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

const sorting = [
  {
    label: 'Terbaru',
    value: 'terbaru',
  },
  {
    label: 'Terlama',
    value: 'terlama',
  },
];

const pageSizes = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
];

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const OrganizationTable = () => {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();

  const [filterParams, setFilterParams] = useState(initialParams);
  const [selectedSorting, setSelectedSorting] = useState(sorting[0]);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_organizations', filterParams],
    queryFn: () => getOrganizations(filterParams, authHeader()),
  });

  const deleteMutation = useMutation(deleteOrganization);

  const deleteOrganizationData = (opdId) => {
    deleteMutation.mutate(
      {
        id: opdId,
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries('get_organizations');
          showToastMessage(result.message);
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  const onPageSizeChanged = (selectedValue) => {
    setSelectedPageSize(selectedValue);
    setFilterParams({
      ...filterParams,
      limit: selectedValue.value,
    });
  };

  const onSorting = (selectedValue) => {
    setSelectedSorting(selectedValue);
    setFilterParams({
      ...filterParams,
      sort: selectedValue.value,
    });
  };

  const onSearchChange = (e) => {
    setTimeout(() => {
      setFilterParams({
        ...filterParams,
        search: e.target.value,
      });
    }, 500);
  };

  const onPaginationChange = (currentPage) => {
    setFilterParams({
      ...filterParams,
      page: currentPage,
    });
  };

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Organisasi</h1>
        <Link to="create">
          <Button
            background="bg-primary"
            textColor="text-white"
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Tambah Organisasi
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full">
          {/* Sorting Dropdown */}
          <DropdownSelect
            value={selectedSorting}
            options={sorting}
            onChange={onSorting}
          >
            <DropdownSelect.HeaderV1 label="Urutkan:" />
          </DropdownSelect>

          {/* Page Size Dropdown */}
          <DropdownSelect
            value={selectedPageSize}
            options={pageSizes}
            onChange={onPageSizeChanged}
          >
            <DropdownSelect.HeaderV1 label="Tampilkan:" endLabel="Entri" />
          </DropdownSelect>
        </div>

        <div className="relative w-full md:w-1/3 mt-3 md:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={filterParams.seacrh}
            onChange={onSearchChange}
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
                  cell: (props) => column.cell(props, deleteOrganizationData),
                }
              : column
          )}
          rows={data?.data.result || []}
          isLoading={isLoading}
        />

        <Pagination
          totalRows={data?.data.total || 0}
          pageChangeHandler={onPaginationChange}
          rowsPerPage={10}
        />
      </div>
    </>
  );
};

export default OrganizationTable;
