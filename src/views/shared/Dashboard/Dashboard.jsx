import React, { useEffect, useRef, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getCounts } from '../../../api/admin/dashboard';
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

export default function Dashboard() {
  const [counts, setCounts] = useState({
    userCount: 0,
    occasionCount: 0,
    organizationCount: 0,
    programCount: 0,
    activityCount: 0,
    purposeCount: 0,
  });
  const [error, setError] = useState(null);
  const [openOpd, setOpenOpd] = useState(false);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [opdData, setOpdData] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });

  const authUser = useRef(useAuthUser());
  const authHeaderRef = useRef(useAuthHeader());

  useEffect(() => {
    async function fetchCounts() {
      try {
        const countsData = await getCounts(authHeaderRef.current);
        setCounts(countsData);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCounts();
  }, []);

  const fetchOrganizations = async (page) => {
    const organizationResponse = await getOrganizations(authHeaderRef.current, {
      limit: 20,
      page,
    });

    if (page === opdData.totalPages) {
      setOpdData((prevData) => ({ ...prevData, hasMore: false }));
    }

    setOpdData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ...organizationResponse.result],
      totalPages: organizationResponse.pages,
    }));
  };

  useEffect(() => {
    fetchOrganizations(opdData.currentPage);
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

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">
        Halo {authUser.current().admin_role_id === 1 ? 'Admin' : 'User OPD'},
        Selamat Datang di halaman elektronik aplikasi&nbsp;
        <span className="italic">e-Montir Pemda</span>
      </h1>

      <div className="flex flex-col space-y-4 lg:flex-row justify-center lg:justify-between mb-8 lg:items-center">
        {authUser.current().admin_role_id === 1 && (
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
        {authUser.current().admin_role_id === 1 ? (
          <>
            <CountBox
              linkTo="urusan"
              title="urusan"
              count={counts.occasionCount}
              color="#56CCF2"
              className="hover:solid-shadow-blue"
            />
            <CountBox
              linkTo="organisasi"
              title="organisasi"
              count={counts.organizationCount}
              color="#BB6BD9"
              className="hover:solid-shadow-purple"
            />
            <CountBox
              linkTo="/"
              title="program"
              count={counts.programCount}
              color="#6FCF97"
              className="hover:solid-shadow-green"
            />
            <CountBox
              linkTo="kegiatan"
              title="kegiatan"
              count={counts.activityCount}
              color="#F2C94C"
              className="hover:solid-shadow-yellow"
            />
            <CountBox
              linkTo="sasaran"
              title="sasaran"
              count={counts.purposeCount}
              color="#F2994A"
              className="hover:solid-shadow-orange"
            />
            <CountBox
              linkTo="login-akses-user"
              title="user"
              count={counts.userCount}
              color="#BDBDBD"
              className="hover:solid-shadow-gray"
            />
          </>
        ) : (
          <CountBox
            linkTo="#"
            title="program"
            count={counts.programCount}
            color="#6FCF97"
            className="hover:solid-shadow-green"
          />
        )}
      </div>
    </>
  );
}
