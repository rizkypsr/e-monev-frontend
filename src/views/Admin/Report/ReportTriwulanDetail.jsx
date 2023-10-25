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

const initialData = {
  id: 0,
  activity_name: '',
  activity_location: '',
  fund_source_id: 0,
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
  created_at: '2023-10-05T05:38:27.413Z',
};

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
        activity_name: triwulanData.activity_name,
        activity_location: triwulanData.activity_location,
        fund_source_id: triwulanData.fundSource.name,
        fund_ceiling: triwulanData.fund_ceiling,
        management_organization: triwulanData.management_organization,
        pptk_name: triwulanData.pptk_name,
        contract_number_date: triwulanData.contract_number_date,
        contractor_name: triwulanData.contractor_name,
        implementation_period: triwulanData.implementation_period,
        contract_value: triwulanData.contract_value,
        physical_realization: triwulanData.physical_realization,
        fund_realization: triwulanData.fund_realization,
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
        created_at: triwulanData.created_at,
      });
    },
  });

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <div>
        <div className="mb-8 cursor-pointer  flex justify-between">
          <div
            className="flex space-x-3 items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <h1 className="font-semibold text-lg text-dark-gray leading-7">
              Detail Triwulan
            </h1>
          </div>
          <div>
            <Button
              className="w-28 lg:w-auto"
              background="bg-primary"
              textColor="text-white"
              icon={<ArrowDownTrayIcon className="w-6 h-6" />}
            >
              Unduh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tanggal
              </th>
              <td className="px-6 py-4">{formattedDate(report.created_at)}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nama Kegiatan
              </th>
              <td className="px-6 py-4">{report.activity_name}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Lokasi Kegiatan
              </th>
              <td className="px-6 py-4">{report.activity_location}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sumber Dana
              </th>
              <td className="px-6 py-4">{report.fund_source_id}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Pagu Dana
              </th>
              <td className="px-6 py-4">{report.fund_ceiling}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                OPD Organisasi
              </th>
              <td className="px-6 py-4">{report.management_organization}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nama PPTK
              </th>
              <td className="px-6 py-4">{report.pptk_name}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nomor dan Tanggal Kontrak
              </th>
              <td className="px-6 py-4">{report.contract_number_date}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nama Kontraktor
              </th>
              <td className="px-6 py-4">{report.contractor_name}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jangka Waktu Pelaksanaan
              </th>
              <td className="px-6 py-4">{report.implementation_period}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nilai Kontrak
              </th>
              <td className="px-6 py-4">{report.contract_value}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Realisasi Fisik
              </th>
              <td className="px-6 py-4">{report.physical_realization}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Realisasi Keuangan
              </th>
              <td className="px-6 py-4">{report.fund_realization}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Volume Kegiatan
              </th>
              <td className="px-6 py-4">{report.activity_volume}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Output Kegiatan
              </th>
              <td className="px-6 py-4">{report.activity_output}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Manfaat Kegiatan (Kelompok sasaran Langsung)
              </th>
              <td className="px-6 py-4">{report.direct_target_group}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Manfaat Kegiatan (Kelompok sasaran Langsung)
              </th>
              <td className="px-6 py-4">{report.indirect_target_group}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jumlah Tenaga Kerja (Lokal)
              </th>
              <td className="px-6 py-4">{report.local_workforce}</td>
            </tr>

            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jumlah Tenaga Kerja (Non Lokal)
              </th>
              <td className="px-6 py-4">{report.non_local_workforce}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Hambatan dan Permasalahan
              </th>
              <td className="px-6 py-4">{report.problems}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jenis Pengadaan
              </th>
              <td className="px-6 py-4">{report.procurement_type}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Cara Pengadaan
              </th>
              <td className="px-6 py-4">{report.procurement_method}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTriwulanDetail;
