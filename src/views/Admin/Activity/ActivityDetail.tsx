import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { getActivity } from '../../../api/admin/activity';
import ErrorPage from '../../ErrorPage';

function ActivityDetail() {
  const [activity, setActivity] = useState('');
  const [programId, setProgramId] = useState('');
  const [error, setError] = useState(false);

  const { id } = useParams();
  const authHeader = useAuthHeader();

  const fetchActivity = async () => {
    try {
      const occasionResponse = await getActivity(authHeader, id);
      setActivity(occasionResponse.title);
      setProgramId(occasionResponse.program_id);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error} showBackButton />;
  }

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <Link to="../" className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">Detail User</h1>
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
                ID Program
              </th>
              <td className="px-6 py-4">{programId}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Kegiatan
              </th>
              <td className="px-6 py-4">{activity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityDetail;
