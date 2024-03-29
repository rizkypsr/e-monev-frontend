import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import formattedDate from '../../../utils/formattedDate';
import getTriwulanDetail from '../../../api/user/triwulan/getTriwulanDetail';
import Button from '../../../components/Button';
import { baseUrlAPI } from '../../../utils/constants';
import formatToRupiah from '../../../utils/formatRupiah';

const initialData = {
  id: 0,
  activity_output_sub: '',
  activity_name: '',
  sub_activity: '',
  program: '',
  activity_location: '',
  fund_source_id: 0,
  fund_source_total: 0,
  fund_ceiling: 0,
  management_organization: '',
  pptk_name: '',
  contract_number_date: '',
  contractor_name: '',
  implementation_period: '',
  contract_value: 0,
  physical_realization: 0,
  fund_realization: 0,
  activity_volume: '',
  activity_output: '',
  direct_target_group: '',
  indirect_target_group: '',
  local_workforce: 0,
  non_local_workforce: 0,
  problems: '',
  solution: '',
  procurement_type: '',
  procurement_method: '',
  user_id: 0,
  file: null,
  created_at: '',
  contract_date: '',
  pic_name: '',
  optional: '',
  reason: '',
  leader_name: '',
  updated_at: '',
};

const fieldMappings = [
  {
    key: 'created_at',
    label: 'Tanggal Dibuat',
    isFormatted: true,
    formatter: formattedDate,
  },
  {
    key: 'updated_at',
    label: 'Terakhir Update',
    isFormatted: true,
    formatter: formattedDate,
  },
  { key: 'activity_name', label: 'Nama Kegiatan' },
  { key: 'activity_output_sub', label: 'Nama Output Sub Kegiatan' },
  { key: 'sub_activity', label: 'Sub Kegiatan' },
  { key: 'program', label: 'Nama Program' },
  { key: 'activity_location', label: 'Lokasi Kegiatan' },
  {
    key: 'fund_source_id',
    label: 'Sumber Dana',
  },
  {
    key: 'fund_source_total',
    label: 'Total Sumber Dana',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'fund_ceiling',
    label: 'Pagu Dana',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  { key: 'management_organization', label: 'OPD Organisasi' },
  { key: 'pptk_name', label: 'Nama PPTK' },
  { key: 'contract_number_date', label: 'Nomor Kontrak' },
  { key: 'contract_date', label: 'Tanggal Kontrak' },
  { key: 'contractor_name', label: 'Nama Penyedia' },
  { key: 'pic_name', label: 'Nama Penanggung Jawab' },
  { key: 'implementation_period', label: 'Jangka Waktu Pelaksanaan' },
  {
    key: 'contract_value',
    label: 'Nilai Kontrak',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'physical_realization',
    label: 'Realisasi Fisik',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'fund_realization',
    label: 'Realisasi Keuangan',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  { key: 'activity_volume', label: 'Volume Kegiatan' },
  { key: 'activity_output', label: 'Output Kegiatan' },
  {
    key: 'direct_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran Langsung)',
  },
  {
    key: 'indirect_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran Langsung)',
  },
  { key: 'local_workforce', label: 'Jumlah Tenaga Kerja (Lokal)' },
  { key: 'non_local_workforce', label: 'Jumlah Tenaga Kerja (Non Lokal)' },
  { key: 'problems', label: 'Hambatan dan Permasalahan' },
  { key: 'procurement_type', label: 'Jenis Pengadaan' },
  { key: 'procurement_method', label: 'Cara Pengadaan' },
  { key: 'optional', label: 'Opsi' },
  { key: 'reason', label: 'Alasan Terkait' },
];

const ReportTriwulanDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [report, setReport] = useState(initialData);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulanDetail(id, authHeader()),
    onSuccess: (result) => {
      const triwulanData = result.data;

      setReport({
        id: triwulanData.id,
        activity_name: triwulanData?.activity?.title,
        activity_output_sub: triwulanData?.activity_name,
        sub_activity: triwulanData?.activity?.sub_activity,
        activity_location: triwulanData?.activity_location,
        program: triwulanData?.activity?.program?.title,
        fund_source_id: triwulanData?.fundSource?.name,
        fund_source_total: triwulanData.fund_source_total ?? 0,
        fund_ceiling: triwulanData.fund_ceiling ?? 0,
        management_organization: triwulanData.management_organization,
        pptk_name: triwulanData.pptk_name,
        contract_number_date: triwulanData.contract_number_date,
        contractor_name: triwulanData.contractor_name,
        implementation_period: triwulanData.implementation_period,
        contract_value: triwulanData.contract_value ?? 0,
        physical_realization: triwulanData.physical_realization ?? 0,
        fund_realization: triwulanData.fund_realization ?? 0,
        activity_volume: triwulanData.activity_volume,
        activity_output: triwulanData.activity_output,
        direct_target_group: triwulanData.direct_target_group,
        indirect_target_group: triwulanData.indirect_target_group,
        local_workforce: triwulanData.local_workforce,
        non_local_workforce: triwulanData.non_local_workforce,
        problems: triwulanData.problems,
        solution: triwulanData.solution,
        procurement_type: triwulanData.procurement_type,
        procurement_method: triwulanData.procurement_method,
        user_id: triwulanData.user_id,
        file: triwulanData.file,
        created_at: triwulanData.created_at,
        contract_date: triwulanData.contract_date,
        pic_name: triwulanData.pic_name,
        optional: triwulanData.optional,
        reason: triwulanData.reason,
        leader_name: triwulanData.leader_name,
        updated_at: triwulanData.updated_at,
      });
    },
  });

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  const renderTableRows = () =>
    fieldMappings.map((field) => (
      <tr
        key={field.key}
        className={
          fieldMappings.indexOf(field) % 2 === 0 ? 'bg-white' : 'bg-light-blue'
        }
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {field.label}
        </th>
        <td className="px-6 py-4">
          {field.isFormatted
            ? field.formatter(report[field.key])
            : report[field.key]}
        </td>
      </tr>
    ));

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <div>
        <div
          className="mb-8 cursor-pointer flex justify-between"
          onClick={() => navigate(-1)}
        >
          <div className="flex space-x-3 items-center">
            <ArrowLeftIcon className="w-6 h-6" />
            <h1 className="font-semibold text-lg text-dark-gray leading-7">
              Detail Triwulan
            </h1>
          </div>
          <a href={baseUrlAPI + report.file} target="__blank">
            <Button
              className="w-28 lg:w-auto"
              background="bg-primary"
              textColor="text-white"
              icon={<ArrowDownTrayIcon className="w-6 h-6" />}
            >
              Unduh Data
            </Button>
          </a>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTriwulanDetail;
