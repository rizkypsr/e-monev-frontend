import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import getFundSource from '../../../api/admin/fundSource/getFundSource';

const initialFundSource = {
  name: '',
  fundSourceTotal: 0,
};

const FundSourceDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();

  const [fundSource, setFundSource] = useState(initialFundSource);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_fund_source'],
    queryFn: () => getFundSource(id, authHeader()),
    onSuccess: (result) => {
      setFundSource({
        name: result.data.name,
        fundSourceTotal: parseFloat(
          result.data.fund_source_total
        ).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }),
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
          Detail Sumber Dana
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
                Nama
              </th>
              <td className="px-6 py-4">{fundSource.name}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total Sumber Dana
              </th>
              <td className="px-6 py-4">{fundSource.fundSourceTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundSourceDetail;
