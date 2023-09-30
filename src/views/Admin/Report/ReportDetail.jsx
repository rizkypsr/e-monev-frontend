import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import getReport from '../../../api/admin/report/getReport';
import formattedDate from '../../../utils/formattedDate';

const initialData = {
  createdAt: '',
  triwulan: '',
  occasion: '',
  organization: '',
  program: '',
  activity: '',
  indicator: '',
};
const ReportDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();

  const [report, setReport] = useState(initialData);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_report'],
    queryFn: () => getReport(id, authHeader()),
    onSuccess: (result) => {
      setReport({
        createdAt: result.data.result.created_at,
        triwulan: result.data.result.triwulan.name,
        occasion: result.data.result.occassion.title,
        organization: result.data.result.organization.title,
        program: result.data.result.program.title,
        activity: '',
        indicator: '',
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
      <Link to="../" className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Detail Laporan
        </h1>
      </Link>

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
              <td className="px-6 py-4">{formattedDate(report.createdAt)}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Triwulan
              </th>
              <td className="px-6 py-4">{report.triwulan}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Urusan
              </th>
              <td className="px-6 py-4">{report.occasion}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Organisasi
              </th>
              <td className="px-6 py-4">{report.organization}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Program
              </th>
              <td className="px-6 py-4">{report.program}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDetail;
