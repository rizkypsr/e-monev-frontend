import React, { useState, useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useDebounce } from '@uidotdev/usehooks';

import { getOrganizations } from '@/api/admin/organization';
import deleteOrganization from '@/api/admin/organization/deleteOrganization';
import { useToastContext } from '@/context/ToastContext';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '@/components/DropdownSelectV2';
import ErrorPage from '@/views/ErrorPage';
import { pageSizes, sorting } from '@/utils/constants';

import columns from './components/columns';

const initialParams = {
  limit: '10',
  page: 1,
  search: '',
  sort: 'terbaru',
};

const OrganizationTable = () => {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();

  const [filterParams, setFilterParams] = useState(initialParams);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_organizations', filterParams],
    queryFn: () => getOrganizations(filterParams, authHeader()),
  });

   useEffect(() => {
    setFilterParams({
      ...filterParams,
      search: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

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

  const handleSelectFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      [key]: value,
    });
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

      <div className="mt-6 flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:justify-between lg:space-x-3">
        <div className="space-y-3 flex flex-col lg:flex-row lg:space-y-0 lg:space-x-3">
          {/* Sorting Dropdown */}
          <Dropdown
            value={filterParams.sort}
            onValueChange={(value) => handleSelectFilter('sort', value)}
          >
            <DropdownTrigger>
              <div className="flex space-x-2">
                <p>Urutkan :</p>
                <DropdownValue />
              </div>
            </DropdownTrigger>
            <DropdownContent>
              {sorting.map((sort) => (
                <DropdownItem key={sort.id} value={sort.id}>
                  {sort.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          {/* Page Size Dropdown */}
          <Dropdown
            value={filterParams.limit}
            onValueChange={(value) => handleSelectFilter('limit', value)}
          >
            <DropdownTrigger>
              <div className="flex space-x-2">
                <p>Tampilkan :</p>
                <DropdownValue />
                <p>entri</p>
              </div>
            </DropdownTrigger>
            <DropdownContent>
              {pageSizes.map((pageSize) => (
                <DropdownItem key={pageSize.id} value={pageSize.name}>
                  {pageSize.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="relative w-full lg:max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchTerm}
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
          rows={data}
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
