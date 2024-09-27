import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDebounce } from '@uidotdev/usehooks';
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
import ErrorPage from '../../ErrorPage';
import DropdownSelect from '../../../components/DropdownSelect';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import deleteFundSource from '../../../api/admin/fundSource/deleteFundSource';
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

const FundSourceTable = () => {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();

  const [filterParams, setFilterParams] = useState(initialParams);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedSorting, setSelectedSorting] = useState(sorting[0]);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['get_fund_sources', filterParams],
    queryFn: () => getFundSource(filterParams, authHeader()),
    enabled: authHeader() !== null,
  });

  useEffect(() => {
    setFilterParams({
      ...filterParams,
      search: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

  const deleteMutation = useMutation(deleteFundSource);

  const deleteFundSourceData = async (id) => {
    deleteMutation.mutate(
      {
        id,
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries('get_fund_sources');
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
        <h1 className="text-2xl font-semibold">Sumber Dana</h1>
        <Link to="create">
          <Button
            background="bg-primary"
            textColor="text-white"
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Tambah Sumber Dana
          </Button>
        </Link>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-3">
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

        <div className="relative w-1/3">
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
                  cell: (props) => column.cell(props, deleteFundSourceData),
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

export default FundSourceTable;
