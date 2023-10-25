import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getActivity } from '../../../api/admin/activity';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';

const initialData = {
  code: '',
  title: '',
  subActivity: '',
  program: '',
};

const ActivityDetail = () => {
  const [activity, setActivity] = useState(initialData);

  const { id } = useParams();
  const authHeader = useAuthHeader();

  const { isError, isLoading, error } = useQuery({
    queryKey: ['get_user'],
    queryFn: () => getActivity(id, authHeader()),
    onSuccess: (result) => {
      setActivity({
        code: result.data.code,
        title: result.data.title,
        subActivity: result.data.sub_activity,
        program: result.data.program?.title,
      });
    },
  });

  if (isError) {
    return <ErrorPage errorMessage={error.message} showBackButton />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <Link to="../" className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Detail Kegiatan
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
                Kode
              </th>
              <td className="px-6 py-4">{activity.code}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Kegiatan
              </th>
              <td className="px-6 py-4">{activity.title}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sub Kegiatan
              </th>
              <td className="px-6 py-4">{activity.subActivity}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Program
              </th>
              <td className="px-6 py-4">{activity.program}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityDetail;
