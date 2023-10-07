import { createColumnHelper } from '@tanstack/react-table';
import { Link, useSearchParams } from 'react-router-dom';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useAuthHeader } from 'react-auth-kit';
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
import { deleteReport } from '../../../api/admin/report';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import { useToastContext } from '../../../context/ToastContext';
import getTriwulanReport from '../../../api/admin/report/getTriwulanReport';
import deleteTriwulanReport from '../../../api/admin/report/deleteTriwulanReport';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor((row, index) => index + 1, {
    id: 'no',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>No</span>,
  }),
  columnHelper.accessor((row) => row.activity_name, {
    id: 'activity_name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nama Kegiatan</span>,
  }),
  columnHelper.accessor((row) => row.activity_location, {
    id: 'activity_location',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Lokasi Kegiatan</span>,
  }),
  columnHelper.accessor((row) => row.fund_source_id, {
    id: 'fund_source_id',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Sumber Dana</span>,
  }),
  columnHelper.accessor((row) => row.fund_ceiling, {
    id: 'fund_ceiling',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Pagu Dana</span>,
  }),
  columnHelper.accessor((row) => row.management_organization, {
    id: 'management_organization',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>OPD Organisasi</span>,
  }),
  columnHelper.accessor((row) => row.pptk_name, {
    id: 'pptk_name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nama PPTK</span>,
  }),
  columnHelper.accessor((row) => row.contract_number_date, {
    id: 'contract_number_date',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nomor dan Tgl Kontrak</span>,
  }),
  columnHelper.accessor((row) => row.contractor_name, {
    id: 'contractor_name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nama Kontraktor</span>,
  }),
  columnHelper.accessor((row) => row.implementation_period, {
    id: 'implementation_period',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Jangka Waktu</span>,
  }),
  columnHelper.accessor((row) => row.contract_value, {
    id: 'contract_value',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nilai Kontrak</span>,
  }),
  columnHelper.accessor((row) => row.physical_realization, {
    id: 'physical_realization',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Realisasi Fisik</span>,
  }),
  columnHelper.accessor((row) => row.fund_realization, {
    id: 'fund_realization',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Realisasi Keuangan</span>,
  }),
  columnHelper.accessor((row) => row.activity_volume, {
    id: 'activity_volume',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Volume Kegiatan</span>,
  }),
  columnHelper.accessor((row) => row.activity_output, {
    id: 'activity_output',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Output Kegiatan</span>,
  }),
  columnHelper.accessor((row) => row.direct_target_group, {
    id: 'direct_target_group',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Manfaat Kegiatan (Kelompok Sasaran Langsung)</span>,
  }),
  columnHelper.accessor((row) => row.indirect_target_group, {
    id: 'indirect_target_group',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => (
      <span>Manfaat Kegiatan (Kelompok Sasaran Tidak Langsung)</span>
    ),
  }),
  columnHelper.accessor((row) => row.local_workforce, {
    id: 'local_workforce',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Jumlah Tenaga Kerja (Lokal)</span>,
  }),
  columnHelper.accessor((row) => row.non_local_workforce, {
    id: 'non_local_workforce',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Jumlah Tenaga Kerja (Non Lokal)</span>,
  }),
  columnHelper.accessor((row) => row.problems, {
    id: 'problems',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Hambatan dan Permasalahan</span>,
  }),
  columnHelper.accessor((row) => row.solution, {
    id: 'solution',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Solusi Permasalahan</span>,
  }),
  columnHelper.accessor((row) => row.procurement_type_id, {
    id: 'procurement_type_id',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Jenis Pengadaan</span>,
  }),
  columnHelper.accessor((row) => row.procurement_method_id, {
    id: 'procurement_method_id',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Cara Pengadaan</span>,
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
            />
          </Link>
          <Link to={`detail/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<EyeIcon className="w-4 h-4" />}
            />
          </Link>

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
  fund_source_id: null,
};

const ReportTriwulanTable = () => {
  const [searchParams] = useSearchParams();

  const [filterParams, setFilterParams] = useState(initialParams);

  useEffect(() => {
    setFilterParams(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_triwulan_reports', filterParams],
    queryFn: () => getTriwulanReport(filterParams, authHeader()),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation(deleteTriwulanReport);

  const deleteReportData = (id) => {
    deleteMutation.mutate(
      {
        id,
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries('get_reports');
          showToastMessage(result);
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
                cell: (props) => column.cell(props, deleteReportData),
              }
            : column
        )}
        rows={data?.data.result || []}
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

export default ReportTriwulanTable;
