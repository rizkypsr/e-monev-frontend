import { createColumnHelper } from '@tanstack/react-table';
import { Link, useSearchParams } from 'react-router-dom';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import TrashImg from '../../../assets/images/trash.png';
import ErrorPage from '../../ErrorPage';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import formattedDate from '../../../utils/formattedDate';
import { useToastContext } from '../../../context/ToastContext';
import getMasterReport from '../../../api/admin/report/getMasterReport';
import deleteMasterReport from '../../../api/admin/report/deleteMasterReport';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor((row, index) => index + 1, {
    id: 'no',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>No</span>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    cell: (info) => <i>{formattedDate(info.getValue())}</i>,
    header: () => <span>Tanggal</span>,
  }),
  columnHelper.accessor((row) => row.triwulan?.name, {
    id: 'Triwulan',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Triwulan</span>,
  }),
  columnHelper.accessor((row) => row.masterOccassions, {
    id: 'Urusan',
    cell: (info) => {
      const titles = info.getValue().map((value) => value.occassion?.title);

      return <i>{titles.join(', ')}</i>;
    },
    header: () => <span>Urusan</span>,
  }),
  columnHelper.accessor((row) => row.organization?.title, {
    id: 'Organisasi',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Organisasi</span>,
  }),
  columnHelper.accessor((row) => row.purpose?.title, {
    id: 'Sasaran',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Sasaran RPJMD</span>,
  }),
  columnHelper.accessor((row) => row.aksi, {
    id: 'aksi',
    size: 10,
    cell: (props, deleteUserData, role) => {
      const rowId = props.row.original.id;
      return (
        <div className="flex justify-end">
          {role === 'Superadmin' ||
            (role === 'OPD' && (
              <Link to={`edit/${rowId}`}>
                <Button
                  className="text-sm font-normal"
                  textColor="text-blue-500"
                  icon={<PencilIcon className="w-4 h-4" />}
                />
              </Link>
            ))}
          <Link to={`detail/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<EyeIcon className="w-4 h-4" />}
            />
          </Link>

          {role === 'Superadmin' ||
            (role === 'OPD' && (
              <Dialog>
                <DialogTrigger>
                  <Button
                    className="text-sm font-normal"
                    type="modal"
                    textColor="text-red-500"
                    icon={<TrashIcon className="w-4 h-4" />}
                  />
                </DialogTrigger>

                <DialogContent className="w-1/3 py-12">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="p-6 bg-[#FFDADA] w-fit rounded-lg">
                      <img src={TrashImg} alt="Hapus" />
                    </div>

                    <div>
                      <h1 className="mt-6 text-lg font-semibold leading-7 text-dark-gray">
                        Apakah Anda yakin menghapus ini?
                      </h1>
                      <div className="flex justify-center space-x-3">
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
                            className="w-full mt-8 md:w-28"
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
            ))}
        </div>
      );
    },
    header: () => <div className="text-right">Aksi</div>,
  }),
];

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
  month: null,
  year: null,
  triwulan_id: null,
};

const ReportMasterTable = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const { showToastMessage } = useToastContext();

  const [filterParams, setFilterParams] = useState(initialParams);

  useEffect(() => {
    setFilterParams({
      ...filterParams,
      ...params,
    });
  }, [searchParams]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_master_reports', filterParams],
    queryFn: () => getMasterReport(filterParams, authHeader()),
  });

  const deleteMutation = useMutation(deleteMasterReport);

  const deleteReportData = (id) => {
    deleteMutation.mutate(
      {
        body: {
          data_master_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries('get_master_reports');
          showToastMessage(result.message);
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
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
    <div className="w-full h-full mt-6 bg-white rounded-lg">
      <Table
        columns={columns.map((column) =>
          column.cell
            ? {
                ...column,
                cell: (props) =>
                  column.cell(props, deleteReportData, authUser()?.role?.name),
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
  );
};

export default ReportMasterTable;
