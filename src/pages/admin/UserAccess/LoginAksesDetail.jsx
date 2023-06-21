import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import ReactLoading from '../../../components/Loading';
import getRole from '../../../utils/getRole';
import ErrorPage from '../../../views/ErrorPage';
import { getUser } from '../../../api/admin/user';

function LoginAksesDetail() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [levelUser, setLevelUser] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = useAuthHeader();

  const fetchUser = async () => {
    setIsLoading(true);

    try {
      const userResponse = await getUser(authHeader, id);

      setName(userResponse.name);
      setUsername(userResponse.username);
      setLevelUser(getRole(userResponse.admin_role_id));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error} />;
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
              <td className="px-6 py-4">{name}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Username
              </th>
              <td className="px-6 py-4">{username}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Level User
              </th>
              <td className="px-6 py-4">{levelUser}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoginAksesDetail;
