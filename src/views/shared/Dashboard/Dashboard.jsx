import React, { useEffect, useMemo, useState } from 'react';
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
import getExcel from '../../../api/admin/dashboard/getExcel';
import FundTotal from './components/FundTotal';
import ProgressBar from '../../../components/ProgressBar';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import getFundSourceChart from '../../../api/admin/dashboard/getFundSourceChart';
import formatRupiah from '../../../utils/formatRupiah';
import ReportTable from './ReportTable';
import { useLocation } from 'react-router-dom';

const initialParams = {
  limit: 0,
  page: 0,
};

const initialFundSourceparams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const initialFundSourceChart = {
  pagu_dana_id: null,
};

const Dashboard = () => {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const token = useMemo(() => authHeader(), [authHeader]);

  const [selectedFundSource, setSelectedFundSource] = useState(null);
  const [filterParams, setFilterParams] = useState(initialFundSourceparams);
  const [filterFundSourceChart, setFilterFundSourceChart] = useState(
    initialFundSourceChart
  );

  const location = useLocation();

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

  const excelQuery = useQuery({
    queryKey: ['get_excel'],
    queryFn: () => getExcel(authHeader()),
    enabled: false,
  });

  const fundSourceQuery = useInfiniteQuery({
    queryKey: ['get_fund_source', filterParams],
    queryFn: async ({ pageParam = 1 }) => {
      const params = filterParams;

      params.page = pageParam;

      const res = await getFundSource(filterParams, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const fundSourceChartQuery = useQuery({
    queryKey: ['get_fund_source_chart', filterFundSourceChart],
    queryFn: () => getFundSourceChart(filterFundSourceChart, authHeader()),
    enabled: selectedFundSource !== null,
  });

  useEffect(() => {
    if (selectedFundSource?.id) {
      setFilterFundSourceChart({
        pagu_dana_id: selectedFundSource.id,
      });
    }
  }, [selectedFundSource]);

  useEffect(() => {
    setSelectedFundSource(null);
    setFilterParams(initialFundSourceparams);
    setFilterFundSourceChart(initialFundSourceChart);
    fundSourceQuery.remove(); // Clear cache for fund source
    fundSourceChartQuery.remove(); // Clear cache for fund source chart
  }, [location]);

  const handleDownloadExcel = async () => {
    await excelQuery.refetch();
  };

  const handleSelectFundSource = (opd) => {
    setSelectedFundSource(opd);
  };

  const handleOnSearch = (e) => {
    setFilterParams({
      ...filterParams,
      search: e,
    });
  };

  if (usersQuery.isError) {
    return <ErrorPage errorMessage={usersQuery.error} />;
  }

  const totalPaguDana = useMemo(
    () => fundSourceChartQuery?.data?.data?.pagu_dana.total_pagu_dana,
    [fundSourceChartQuery?.data?.data?.pagu_dana.total_pagu_dana]
  );
  const totalPaguDanaDigunakan = useMemo(
    () => fundSourceChartQuery?.data?.data?.pagu_dana.total_pagu_dana_digunakan,
    [fundSourceChartQuery?.data?.data?.pagu_dana.total_pagu_dana_digunakan]
  );
  const showCountBox = (roles) => roles.includes(authUser().role.name);

  const progressBarData = useMemo(
    () =>
      fundSourceChartQuery?.data?.data?.triwulan.map((triwulan) => ({
        label: triwulan.nama_aktifitas,
        completed: triwulan.realisasi_fisik,
        total: triwulan.pagu_dana,
      })),
    [fundSourceChartQuery?.data?.data?.triwulan]
  );

  return (
    <>
      <h1 className="font-semibold text-2xl mb-4">
        Halo {authUser().role.name}, Selamat Datang di halaman elektronik
        aplikasi&nbsp;
        <span className="italic">e-Montir Pemda</span>
      </h1>

      <a
        className="text-2xl underline"
        href="https://sipd.kemendagri.go.id/landing"
      >
        https://sipd.kemendagri.go.id/landing
      </a>

      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-center lg:justify-between my-8 lg:items-end">
        {authUser().role.id === 1 && (
          <div className="flex-1">
            <Label className="mb-2">Sumber Dana</Label>
            <DropdownDialog
              label="Pilih Sumber Dana"
              data={fundSourceQuery.data}
              value={selectedFundSource}
              onChange={handleSelectFundSource}
              maxWidth="max-w-sm"
              enableSearch
              searchValue={filterParams.search}
              onSearch={handleOnSearch}
            />
          </div>
        )}

        {authUser().role.name !== 'OPD' && (
          <div className="flex space-x-2 flex-3">
            {/* <Button
              className="w-28 lg:w-auto"
              type="submit"
              background="bg-primary"
              textColor="text-white"
              icon={<ArrowDownTrayIcon className="w-6 h-6" />}
            >
              Unduh Data (PDF)
            </Button>
            <Button
              onClick={handleDownloadExcel}
              className="w-28 lg:w-auto"
              type="submit"
              background="bg-primary"
              textColor="text-white"
              icon={<ArrowDownTrayIcon className="w-6 h-6" />}
              loading={excelQuery.isLoading}
            >
              Unduh Data (XLS)
            </Button> */}
          </div>
        )}
      </div>

      {authUser().role.name !== 'OPD' && (
        <div className="mb-8 bg-white rounded-lg shadow-2xl shadow-[#F3F6FF] p-8">
          <h1 className="text-2xl font-semibold text-center space-x-3">
            <span>Sumber Dana:</span>
            <span className="uppercase">
              {fundSourceChartQuery?.data?.data?.pagu_dana.name}
            </span>
          </h1>
          <div className="mt-6 flex justify-center space-x-16">
            <FundTotal
              title="Total Sumber Dana"
              color="bg-[#56CCF2]"
              total={formatRupiah(totalPaguDana)}
            />
            <FundTotal
              title="Total Pagu Dana"
              color="bg-[#BB6BD9]"
              total={formatRupiah(totalPaguDanaDigunakan)}
            />
          </div>

          <div className="space-y-6 ">
            {progressBarData && <ProgressBar data={progressBarData} />}
            {/* {fundSourceChartQuery?.data?.data?.triwulan.map((triwulan) => (
              <ProgressBar
                label={triwulan.nama_aktifitas}
                completed={triwulan.realisasi_fisik}
                total={triwulan.pagu_dana}
              />
            ))} */}
          </div>
        </div>
      )}

      {authUser().role.name !== 'OPD' && (
        <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 p-8 shadow-2xl shadow-[#F3F6FF]">
          {showCountBox(['Superadmin', 'Admin Bidang']) && (
            <CountBox
              linkTo="urusan"
              title="urusan"
              count={occassionsQuery.data?.data.total || 0}
              color="#56CCF2"
              className="hover:solid-shadow-blue"
            />
          )}
          {showCountBox(['Superadmin']) && (
            <CountBox
              linkTo="organisasi"
              title="organisasi"
              count={organizationsQuery.data?.data.total || 0}
              color="#BB6BD9"
              className="hover:solid-shadow-purple"
            />
          )}
          {showCountBox(['Superadmin', 'Admin Bidang']) && (
            <CountBox
              linkTo="program"
              title="program"
              count={programsQuery.data?.data.total || 0}
              color="#6FCF97"
              className="hover:solid-shadow-green"
            />
          )}
          {showCountBox(['Superadmin', 'Admin Bidang']) && (
            <CountBox
              linkTo="kegiatan"
              title="kegiatan"
              count={activitiesQuery.data?.data.total || 0}
              color="#F2C94C"
              className="hover:solid-shadow-yellow"
            />
          )}
          {showCountBox(['Superadmin', 'Admin Bidang']) && (
            <CountBox
              linkTo="sasaran"
              title="sasaran"
              count={purposesQuery.data?.data.total || 0}
              color="#F2994A"
              className="hover:solid-shadow-orange"
            />
          )}
          {showCountBox(['Superadmin']) && (
            <CountBox
              linkTo="login-akses-user"
              title="user"
              count={usersQuery.data?.data.total || 0}
              color="#BDBDBD"
              className="hover:solid-shadow-gray"
            />
          )}
        </div>
      )}

      {authUser().role.name === 'OPD' && <ReportTable />}
    </>
  );
};

export default Dashboard;
