import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getOrganization } from '../../../api/admin/organization';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';

const initialData = {
  code: '',
  title: '',
};

const OrganizationDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();

  const [organization, setOrganization] = useState(initialData);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_organization'],
    queryFn: () => getOrganization(id, authHeader()),
    onSuccess: (result) => {
      setOrganization(result.data);
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
          Detail Organisasi
        </h1>
      </Link>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                No.
              </th>
              <td className="px-6 py-4">{id}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Kode
              </th>
              <td className="px-6 py-4">{organization.code}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Urusan
              </th>
              <td className="px-6 py-4">{organization.title}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Nama Kepala Dinas
              </th>
              <td className="px-6 py-4">{organization.kepala_dinas_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationDetail;
