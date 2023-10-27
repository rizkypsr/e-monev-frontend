import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import formattedDate from '../../../utils/formattedDate';
import getMasterDetail from '../../../api/user/master/getMasterDetail';

const initialData = {
  id: 0,
  description: '',
  triwulan: '',
  organization: '',
  occassion: '',
  purpose: '',
  created_at: '',
};

const ReportMasterDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();

  const [report, setReport] = useState(initialData);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_master'],
    queryFn: () => getMasterDetail(id, authHeader()),
    onSuccess: (result) => {
      const data = result.data.result;

      setReport({
        id: data.id,
        description: data.description,
        occassion: data.masterOccassions?.map(
          (value) => value.occassion?.title
        ),
        organization: data.organization?.title,
        purpose: data.purpose?.title,
        triwulan: data.triwulan?.name,
        created_at: data.created_at,
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
      <Link
        to="/laporan/data-master?limit=10&page=1&sort=terbaru&search="
        className="flex space-x-3 items-center mb-8"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Detail Master
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
              <td className="px-6 py-4">{formattedDate(report.created_at)}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sasaran RPJMD
              </th>
              <td className="px-6 py-4">{report.purpose}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Triwulan
              </th>
              <td className="px-6 py-4">{report.triwulan}</td>
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
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Indikator Kegiatan
              </th>
              <td className="px-6 py-4">{report.description}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Urusan
              </th>
              <td className="px-6 py-4">
                {Array.isArray(report?.occassion)
                  ? report?.occassion?.join(', ')
                  : 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportMasterDetail;
