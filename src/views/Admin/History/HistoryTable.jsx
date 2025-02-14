import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Table from '../../../components/Table';
import { useToastContext } from '../../../context/ToastContext';
import Pagination from '../../../components/Pagination';
import ErrorPage from '../../ErrorPage';
import getTriwulanReport from '../../../api/admin/report/getTriwulanReport';
import DropdownDialog from '../../../components/DropdownDialog';
import { getOrganizations } from '../../../api/admin/organization';
import Label from '../../../components/Label';
import deleteTriwulanReport from '../../../api/admin/report/deleteTriwulanReport';
import Button from '../../../components/Button';
import useFileDownloader from '../../../hooks/useFileDownloader';
import { baseUrlAPI } from '../../../utils/constants';

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
  columnHelper.accessor((row) => row.fundSource?.name, {
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
  columnHelper.accessor((row) => row.kepala_dinas_name, {
    id: 'kepala_dinas_name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Nama Kepala Dinas</span>,
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
  columnHelper.accessor((row) => row.catatan_realisasi_fisik, {
    id: 'catatan_realisasi_fisik',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Catatan Realisasi Fisik</span>,
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
    cell: (props, downloadFile) => {
      const data = props.row.original;
      const file = data.file;

      return (
        <div className="flex justify-end">
          <Button
            className="text-sm font-normal"
            textColor="text-blue-500"
            icon={<ArrowDownTrayIcon className="w-4 h-4" />}
            onClick={() => {
              if (file) {
                downloadFile(baseUrlAPI + file);
              }
            }}
          />
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
};

const initialOpdParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const HistoryTable = () => {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();
  const { downloadFile } = useFileDownloader();

  const [filterParams, setFilterParams] = useState(initialParams);
  const [filterOpdParams, setFilterOpdParams] = useState(initialOpdParams);
  const [selectedOpd, setSelectedOpd] = useState(null);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_triwulan_reports', filterParams],
    queryFn: () => getTriwulanReport(filterParams, authHeader()),
    keepPreviousData: true,
  });

  const opdQuery = useInfiniteQuery({
    queryKey: ['get_organizations'],
    queryFn: async ({ pageParam = 1 }) => {
      const params = filterOpdParams;

      params.page = pageParam;

      const res = await getOrganizations(params, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const handleOpdOnBottom = () => {
    opdQuery.fetchNextPage();
  };

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
  };

  const onPaginationChange = (currentPage) => {
    setFilterParams({
      ...filterParams,
      page: currentPage,
    });
  };

  const handleDownloadFile = (url) => {
    downloadFile(url);
  };

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Riwayat</h1>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex-1">
          <Label className="mb-2">OPD</Label>
          <DropdownDialog
            label="Pilih OPD"
            data={opdQuery.data}
            value={selectedOpd}
            maxWidth="max-w-sm"
            onChange={handleSelectOpd}
            fetchNextPage={opdQuery.fetchNextPage}
            hasNextPage={opdQuery.hasNextPage}
            isFetchingNextPage={opdQuery.isFetchingNextPage}
            onBottom={() => handleOpdOnBottom()}
          />
        </div>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg">
        <Table
          columns={columns.map((column) =>
            column.cell
              ? {
                ...column,
                cell: (props) => column.cell(props, handleDownloadFile),
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

export default HistoryTable;
