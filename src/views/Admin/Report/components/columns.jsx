import { Link } from 'react-router-dom';
import {
  ArrowDownOnSquareIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Button from '../../../../components/Button';
import { baseUrlAPI } from '../../../../utils/constants';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../../components/DialogContent';
import TrashImg from '../../../../assets/images/trash.png';
import formattedDate from '../../../../utils/formattedDate';

const columns = [
  {
    header: 'No',
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
  },
  {
    accessorKey: 'activity_name',
    header: 'Nama Kegiatan',
    cell: (info) => <div className="w-52">{info.getValue()}</div>,
  },
  {
    accessorFn: (row) => {
      let data = row.activity_location;

      try {
        data = JSON.parse(data);

        return data?.name ?? '-';
      } catch (error) {
        return data ?? '-';
      }
    },
    header: 'Lokasi Kegiatan',
    cell: (info) => <div className="w-64">{info.getValue()}</div>,
  },
  {
    accessorFn: (row) => row.fundSource?.name ?? '-',
    header: 'Sumber Dana',
  },
  {
    accessorKey: 'fund_ceiling',
    header: 'Pagu Dana',
    cell: (info) => (
      <i>
        {parseFloat(info.getValue()).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })}
      </i>
    ),
  },
  {
    accessorFn: (row) => row.management_organization ?? '-',
    header: 'OPD Organisasi',
  },
  {
    accessorFn: (row) => row.pptk_name ?? '-',
    header: 'Nama PPTK',
  },
  {
    accessorFn: (row) => row.contract_number_date ?? '-',
    header: 'Nomor Kontrak',
  },
  {
    accessorFn: (row) => row.contract_date ?? '-',
    header: 'Tanggal Kontrak',
    cell: (info) => <div className="w-24">{info.getValue()}</div>,
  },
  {
    accessorFn: (row) => row.contractor_name ?? '-',
    header: 'Nama Penyedia',
  },
  {
    accessorFn: (row) => row.pic_name ?? '-',
    header: 'Nama Penanggung Jawab',
  },
  {
    accessorFn: (row) => row.leader_name ?? '-',
    header: 'Nama Pemimpin',
  },
  {
    accessorFn: (row) => row.implementation_period ?? '-',
    header: 'Jangka Waktu',
    cell: (info) => <div className="w-40">{info.getValue()}</div>,
  },
  {
    accessorKey: 'contract_value',
    header: 'Nilai Kontrak',
    cell: (info) => (
      <i>
        {parseFloat(info.getValue()).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })}
      </i>
    ),
  },
  {
    accessorKey: 'physical_realization',
    header: 'Realisasi Fisik',
    cell: (info) => (
      <i>
        {parseFloat(info.getValue()).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })}
      </i>
    ),
  },
  {
    accessorKey: 'fund_realization',
    header: 'Realisasi Keuangan',
    cell: (info) => (
      <i>
        {parseFloat(info.getValue()).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })}
      </i>
    ),
  },
  {
    accessorFn: (row) => row.activity_volume ?? '-',
    header: 'Volume Kegiatan',
  },
  {
    accessorFn: (row) => row.activity_output ?? '-',
    header: 'Output Kegiatan',
    cell: (info) => <div className="w-52">{info.getValue()}</div>,
  },
  {
    accessorFn: (row) => row.direct_target_group ?? '-',
    header: 'Manfaat Kegiatan (Kelompok Sasaran Langsung)',
  },
  {
    accessorFn: (row) => row.indirect_target_group ?? '-',
    header: 'Manfaat Kegiatan (Kelompok Sasaran Tidak Langsung)',
  },
  {
    accessorFn: (row) => row.local_workforce ?? '-',
    header: 'Jumlah Tenaga Kerja (Lokal)',
  },
  {
    accessorFn: (row) => row.non_local_workforce ?? '-',
    header: 'Jumlah Tenaga Kerja (Non Lokal)',
  },
  {
    accessorFn: (row) => row.problems ?? '-',
    header: 'Hambatan dan Permasalahan',
  },
  {
    accessorFn: (row) => row.solution ?? '-',
    header: 'Solusi Permasalahan',
  },
  {
    accessorFn: (row) => row.procurement_type ?? '-',
    header: 'Jenis Pengadaan',
  },
  {
    accessorFn: (row) => row.procurement_method ?? '-',
    header: 'Cara Pengadaan',
  },
  {
    accessorFn: (row) => row.optional ?? '-',
    header: 'Opsi',
  },
  {
    accessorFn: (row) => row.reason ?? '-',
    header: 'Alasan Terkait',
  },
  {
    accessorFn: (row) => row.updated_at ?? '-',
    header: 'Update Terakhir',
    cell: (info) => (
      <div className="w-24">{formattedDate(info.getValue())}</div>
    ),
  },
  {
    id: 'action',
    header: () => <div className="text-right">Aksi</div>,
    cell: (props, deleteUserData, role, downloadFile) => {
      const data = props.row.original;
      const rowId = data.id;
      const { file } = data;

      return (
        <div className="flex justify-end">
          {role === 'Superadmin' && (
            <Link to={`/data-triwulan/${rowId}`}>
              <Button
                className="text-sm font-normal"
                textColor="text-blue-500"
                icon={<PencilIcon className="w-4 h-4" />}
              />
            </Link>
          )}
          <Link to={`detail/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<EyeIcon className="w-4 h-4" />}
            />
          </Link>
          <Button
            className="text-sm font-normal"
            textColor="text-blue-500"
            icon={<ArrowDownOnSquareIcon className="w-4 h-4" />}
            onClick={() => {
              if (file) {
                downloadFile({
                  fileUrl: `${baseUrlAPI}/data-report/user/data-triwulan/excel/${rowId}`,
                  isFetch: true,
                });
              }
            }}
          />

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
                    <div className="p-6 bg-[rgb(255,218,218)] w-fit rounded-lg">
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
  },
];

export default columns;
