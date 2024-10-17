import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Pagination from '../../../components/Pagination';
import ErrorPage from '../../ErrorPage';
import { useToastContext } from '../../../context/ToastContext';
import DropdownSelect from '../../../components/DropdownSelect';
import { deleteUser, getUsers } from '../../../api/admin/user';
import columns from './components/columns';

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

const UserAccessTable = () => {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();

  const [filterParams, setFilterParams] = useState(initialParams);
  const [selectedSorting, setSelectedSorting] = useState(sorting[0]);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['get_users', filterParams],
    queryFn: () => getUsers(filterParams, authHeader()),
    enabled: authHeader() !== null,
  });

  const deleteMutation = useMutation(deleteUser);

  const deleteUserData = (userId) => {
    deleteMutation.mutate(
      {
        id: userId,
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          showToastMessage(result.message);
          queryClient.invalidateQueries('get_users');
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
            value={filterParams.search}
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
                  cell: (props) => column.cell(props, deleteUserData),
                }
              : column
          )}
          rows={data}
          isLoading={isLoading}
        />

        <Pagination
          totalRows={data?.data.total || 0}
          pageChangeHandler={onPaginationChange}
          rowsPerPage={filterParams.limit}
        />
      </div>
    </>
  );
};

export default UserAccessTable;
