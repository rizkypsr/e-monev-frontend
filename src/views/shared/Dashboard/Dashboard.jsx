import React, { useMemo, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { useInfiniteQuery, useQuery } from 'react-query';
import ErrorPage from '../../ErrorPage';
import CountBox from './components/CountBox';
import { getOrganizations } from '../../../api/admin/organization';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import { getUsers } from '../../../api/admin/user';
import { getOccasions } from '../../../api/admin/occasion';
import { getPrograms } from '../../../api/admin/program';
import { getActivities } from '../../../api/admin/activity';
import { getPurposes } from '../../../api/admin/purpose';
import DropdownDialog from '../../../components/DropdownDialog';

const initialParams = {
  limit: 0,
  page: 0,
};

const intialOpdparams = {
  limit: 10,
  page: 1,
};

const Dashboard = () => {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const token = useMemo(() => authHeader(), [authHeader]);

  const [selectedOpd, setSelectedOpd] = useState(null);

  const occassionsQuery = useQuery({
    queryKey: ['get_occassions', initialParams],
    queryFn: () => getOccasions(initialParams, authHeader()),
    enabled: token !== null,
  });

  const organizationsQuery = useQuery({
    queryKey: ['get_organizations', initialParams],
    queryFn: () => getOrganizations(initialParams, authHeader()),
    enabled: token !== null,
  });

  const programsQuery = useQuery({
    queryKey: ['get_programs', initialParams],
    queryFn: () => getPrograms(initialParams, authHeader()),
    enabled: token !== null,
  });

  const activitiesQuery = useQuery({
    queryKey: ['get_activities', initialParams],
    queryFn: () => getActivities(initialParams, authHeader()),
    enabled: token !== null,
  });

  const purposesQuery = useQuery({
    queryKey: ['get_purposes', initialParams],
    queryFn: () => getPurposes(initialParams, authHeader()),
    enabled: token !== null,
  });

  const usersQuery = useQuery({
    queryKey: ['get_users', initialParams],
    queryFn: () => getUsers(initialParams, authHeader()),
    enabled: token !== null,
  });

  const opdQuery = useInfiniteQuery({
    queryKey: ['get_organizations'],
    queryFn: async ({ pageParam = 1 }) =>
      getOrganizations(intialOpdparams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
  };

  if (usersQuery.isError) {
    return <ErrorPage errorMessage={usersQuery.error} />;
  }

  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">
        Halo {authUser().role.id === 1 ? 'Admin' : 'User OPD'}, Selamat Datang
        di halaman elektronik aplikasi&nbsp;
        <span className="italic">e-Montir Pemda</span>
      </h1>

      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-center lg:justify-between mb-8 lg:items-end">
        {authUser().role.id === 1 && (
          <div className="flex-1">
            <Label className="mb-2">OPD</Label>
            <DropdownDialog
              label="Pilih OPD"
              data={opdQuery.data}
              value={selectedOpd}
              onChange={handleSelectOpd}
              maxWidth="max-w-sm"
            />
          </div>
        )}

        <div className="flex space-x-2 flex-3">
          <Button
            className="w-28 lg:w-auto"
            type="submit"
            background="bg-primary"
            textColor="text-white"
            icon={<ArrowDownTrayIcon className="w-6 h-6" />}
          >
            Unduh Data (PDF)
          </Button>
          <Button
            className="w-28 lg:w-auto"
            type="submit"
            background="bg-primary"
            textColor="text-white"
            icon={<ArrowDownTrayIcon className="w-6 h-6" />}
          >
            Unduh Data (XLS)
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 p-8 shadow-2xl shadow-[#F3F6FF]">
        {authUser().role.name.toLowerCase() === 'superadmin' ? (
          <>
            <CountBox
              linkTo="urusan"
              title="urusan"
              count={occassionsQuery.data?.data.total || 0}
              color="#56CCF2"
              className="hover:solid-shadow-blue"
            />
            <CountBox
              linkTo="organisasi"
              title="organisasi"
              count={organizationsQuery.data?.data.total || 0}
              color="#BB6BD9"
              className="hover:solid-shadow-purple"
            />
            <CountBox
              linkTo="program"
              title="program"
              count={programsQuery.data?.data.total || 0}
              color="#6FCF97"
              className="hover:solid-shadow-green"
            />
            <CountBox
              linkTo="kegiatan"
              title="kegiatan"
              count={activitiesQuery.data?.data.total || 0}
              color="#F2C94C"
              className="hover:solid-shadow-yellow"
            />
            <CountBox
              linkTo="sasaran"
              title="sasaran"
              count={purposesQuery.data?.data.total || 0}
              color="#F2994A"
              className="hover:solid-shadow-orange"
            />
            <CountBox
              linkTo="login-akses-user"
              title="user"
              count={usersQuery.data?.data.total || 0}
              color="#BDBDBD"
              className="hover:solid-shadow-gray"
            />
          </>
        ) : (
          <CountBox
            linkTo="/"
            title="program"
            count={programsQuery.data?.data.total || 0}
            color="#6FCF97"
            className="hover:solid-shadow-green"
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
