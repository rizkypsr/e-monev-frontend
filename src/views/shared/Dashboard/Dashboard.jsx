import React, { useEffect, useMemo, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';
import ErrorPage from '../../ErrorPage';
import CountBox from './components/CountBox';
import SelectInputModal from '../../../components/SelectInputModal';
import { getOrganizations } from '../../../api/admin/organization';
import ReactLoading from '../../../components/Loading';
import List from '../../../components/List';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import { getUsers } from '../../../api/admin/user';
import { getOccasions } from '../../../api/admin/occasion';
import { getPrograms } from '../../../api/admin/program';
import { getActivities } from '../../../api/admin/activity';
import { getPurposes } from '../../../api/admin/purpose';

const initialParams = {
  limit: 0,
  page: 0,
};

export default function Dashboard() {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const token = useMemo(() => authHeader(), [authHeader]);

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

  const [openOpd, setOpenOpd] = useState(false);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [opdData, setOpdData] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });

  // useEffect(() => {
  //   async function fetchCounts() {
  //     try {
  //       const countsData = await getCounts(authHeaderRef.current);
  //       setCounts(countsData);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }

  //   fetchCounts();
  // }, []);

  const fetchOrganizations = async (page) => {
    if (token) {
      const organizationResponse = await getOrganizations(
        {
          limit: 10,
          page,
        },
        token
      );

      if (page === opdData.totalPages) {
        setOpdData((prevData) => ({ ...prevData, hasMore: false }));
      }

      setOpdData((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...organizationResponse.data.result],
        totalPages: organizationResponse.data.total,
      }));
    }
  };

  useEffect(() => {
    fetchOrganizations(opdData.currentPage, token);
  }, [opdData.currentPage]);

  const loadMoreData = async () => {
    setOpdData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
    setOpenOpd(false);
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

      <div className="flex flex-col space-y-4 lg:flex-row justify-center lg:justify-between mb-8 lg:items-center">
        {authUser().role.id === 1 && (
          <div>
            <Label>OPD</Label>
            <Dialog open={openOpd} onOpenChange={setOpenOpd}>
              <DialogTrigger className="w-full lg:w-72">
                <SelectInputModal
                  className="mt-2 bg-white"
                  selectedValue={selectedOpd && selectedOpd.title}
                  label="--- Pilih OPD ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Nama OPD">
                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>
                {opdData.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={opdData.items.length}
                    next={loadMoreData}
                    hasMore={opdData.hasMore}
                    height={500}
                  >
                    <List
                      data={opdData.items}
                      onSelectValue={handleSelectOpd}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="flex space-x-2">
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
}
