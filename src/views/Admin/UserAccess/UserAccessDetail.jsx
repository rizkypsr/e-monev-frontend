import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import { getUser } from '../../../api/admin/user';

const initialUser = {
  name: '',
  username: '',
  levelUser: '',
};

const UserAccessDetail = () => {
  const { id } = useParams();

  const [user, setUser] = useState(initialUser);

  const authHeader = useAuthHeader();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_user'],
    queryFn: () => getUser(id, authHeader()),
    onSuccess: (result) => {
      setUser({
        name: result.data.name,
        username: result.data.username,
        levelUser: result.data.role.name,
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
          Detail User
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
                ID
              </th>
              <td className="px-6 py-4">{id}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Nama
              </th>
              <td className="px-6 py-4">{user.name}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Username
              </th>
              <td className="px-6 py-4">{user.username}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Level User
              </th>
              <td className="px-6 py-4">{user.levelUser}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccessDetail;
