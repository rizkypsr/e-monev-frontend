import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import getOccassion from '../../../api/admin/occasion/getOccasionDetail';

const initialData = {
  code: '',
  title: '',
};

const OccassionDetail = () => {
  const [occassion, setOccassion] = useState(initialData);

  const { id } = useParams();
  const authHeader = useAuthHeader();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_occassion'],
    queryFn: () => getOccassion(id, authHeader()),
    onSuccess: (result) => {
      setOccassion({
        code: result.data.code,
        title: result.data.title,
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
          Detail Urusan
        </h1>
      </Link>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                No.
              </th>
              <td className="px-6 py-4">{id}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Kode
              </th>
              <td className="px-6 py-4">{occassion.code}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Urusan
              </th>
              <td className="px-6 py-4">{occassion.title}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OccassionDetail;
