/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';

import useSearchParamsState from '../../../hooks/useSearchParamsState';
import useDebounce from '../../../hooks/useDebounce';
import { useToastContext } from '../../../context/ToastContext';

import getTriwulan from '../../../api/static/getTriwulan';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import downloadTriwulanExcel from '../../../api/admin/report/downloadTriwulanExcel';
import downloadTriwulanPdf from '../../../api/admin/report/downloadTriwulanPdf';

import objectToQueryString from '../../../utils/objectToQueryString';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '../../../components/DropdownSelectV2';
import ButtonV2 from '../../../components/ButtonV2';

import {
  bentukKegiatanData,
  caraPengadaanData,
  jenisPengadaanData,
  programPrioritasData,
} from '../../User/Triwulan/constants';

const months = [
  { id: 1, name: 'Januari' },
  { id: 2, name: 'Februari' },
  { id: 3, name: 'Maret' },
  { id: 4, name: 'April' },
  { id: 5, name: 'Mei' },
  { id: 6, name: 'Juni' },
  { id: 7, name: 'Juli' },
  { id: 8, name: 'Agustus' },
  { id: 9, name: 'September' },
  { id: 10, name: 'Oktober' },
  { id: 11, name: 'November' },
  { id: 12, name: 'Desember' },
];

const years = Array.from({ length: 38 }, (_, i) => ({
  id: (2023 + i).toString(),
  name: (2023 + i).toString(),
}));

const initialFundSourceParams = {
  limit: 10,
  page: 1,
  sort: 'terbaru',
};

const initialFilterParams = {
  limit: 10,
  page: 1,
  sort: 'terbaru',
};

const initialFilters = {
  month: '',
  year: '',
  triwulan_id: '',
  fund_source_id: '',
  tipe_pengadaan: '',
  bentuk_pengadaan: '',
  cara_pengadaan: '',
  program_prio: '',
};

const ReportTableWrapper = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [filters, setFilters] = React.useState(initialFilters);

  const [searchParamsState, setSearchParamsState] =
    useSearchParamsState(initialFilterParams);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearchParamsState({
      ...searchParamsState,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  const triwulanQuery = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulan(authHeader()),
  });

  const fundSourceQuery = useQuery({
    queryKey: ['get_fund_source'],
    queryFn: () => getFundSource(initialFundSourceParams, authHeader()),
  });

  const handleDownloadPDF = async () => {
    const fileName = 'Data Kegiatan.pdf';
    const res = await downloadTriwulanPdf(searchParamsState, authHeader());

    if (res) {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(res);

      // Create a link element
      const link = document.createElement('a');

      // Set the href and download attributes to trigger the download
      link.href = blobUrl;
      link.download = fileName;

      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and remove the link from the DOM
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } else {
      showToastMessage('Terjadi kesalahan saat mengunduh file', 'error');
    }
  };

  const handleDownloadExcel = async () => {
    const fileName = 'Data Triwulan.xlsx';
    const res = await downloadTriwulanExcel(searchParamsState, authHeader());

    if (res) {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(res);

      // Create a link element
      const link = document.createElement('a');

      // Set the href and download attributes to trigger the download
      link.href = blobUrl;
      link.download = fileName;

      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and remove the link from the DOM
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } else {
      showToastMessage('Terjadi kesalahan saat mengunduh file', 'error');
    }
  };

  const handleSelectFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    setSearchParamsState({
      ...searchParamsState,
      [key]: value,
    });
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const resetFilter = () => {
    setSearchParamsState(initialFilterParams);
    setFilters(initialFilters);
    setSearch('');

    const queryString = objectToQueryString(initialFilterParams);
    navigate(`/laporan?${queryString}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Data Laporan</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-3 md:space-y-0">
        <div className="w-full md:w-auto min-w-[14rem]"></div>
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={search}
            onChange={onSearchChange}
            className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
            placeholder="Pencarian"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-3 space-y-3 md:space-y-0 md:space-x-3">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Dropdown
              value={filters.fund_source_id}
              onValueChange={(value) =>
                handleSelectFilter('fund_source_id', value)
              }
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Sumber Dana" />
              </DropdownTrigger>
              <DropdownContent>
                {fundSourceQuery.data?.data?.result.map((fundSource) => (
                  <DropdownItem key={fundSource.id} value={fundSource.id}>
                    {fundSource.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={filters.month}
              onValueChange={(value) => handleSelectFilter('month', value)}
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Bulan" />
              </DropdownTrigger>
              <DropdownContent>
                {months.map((month) => (
                  <DropdownItem key={month.id} value={month.id}>
                    {month.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={filters.year}
              onValueChange={(value) => handleSelectFilter('year', value)}
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Tahun" />
              </DropdownTrigger>
              <DropdownContent>
                {years.map((year) => (
                  <DropdownItem key={year.id} value={year.id}>
                    {year.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            {/* <Dropdown
              value={filters.triwulan_id}
              onValueChange={(value) => handleSelectFilter('triwulan_id', value)}
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Triwulan" />
              </DropdownTrigger>
              <DropdownContent>
                {triwulanQuery.data?.data?.map((triwulan) => (
                  <DropdownItem key={triwulan.id} value={triwulan.id}>
                    {triwulan.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown> */}

            <Dropdown
              value={filters.tipe_pengadaan}
              onValueChange={(value) =>
                handleSelectFilter('tipe_pengadaan', value)
              }
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Jenis Pengadaan" />
              </DropdownTrigger>
              <DropdownContent>
                {jenisPengadaanData.map((jenisPengadaan) => (
                  <DropdownItem
                    key={jenisPengadaan.id}
                    value={jenisPengadaan.name}
                  >
                    {jenisPengadaan.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={filters.cara_pengadaan}
              onValueChange={(value) =>
                handleSelectFilter('cara_pengadaan', value)
              }
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Cara Pengadaan" />
              </DropdownTrigger>
              <DropdownContent>
                {caraPengadaanData.map((caraPengadaan) => (
                  <DropdownItem key={caraPengadaan.id} value={caraPengadaan.name}>
                    {caraPengadaan.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={filters.bentuk_pengadaan}
              onValueChange={(value) =>
                handleSelectFilter('bentuk_pengadaan', value)
              }
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Bentuk Pengadaan" />
              </DropdownTrigger>
              <DropdownContent>
                {bentukKegiatanData.map((bentuk) => (
                  <DropdownItem key={bentuk.id} value={bentuk.name}>
                    {bentuk.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={filters.program_prio}
              onValueChange={(value) => handleSelectFilter('program_prio', value)}
            >
              <DropdownTrigger>
                <DropdownValue placeholder="Pilih Program Prioritas" />
              </DropdownTrigger>
              <DropdownContent>
                {programPrioritasData.map((programPrio) => (
                  <DropdownItem key={programPrio.id} value={programPrio.name}>
                    {programPrio.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

          </div>

          <ButtonV2
            className="w-full md:w-auto px-3"
            background="bg-primary"
            textColor="text-white"
            onClick={resetFilter}
          >
            Reset
          </ButtonV2>
        </div>

        {/* className="w-full md:w-fit lg:w-auto bg-primary text-white" className="w-full md:w-28 lg:w-auto bg-primary text-white" */}

        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2">
          <ButtonV2
            type="submit"
            className="w-full md:w-fit lg:w-auto bg-primary text-white"
            icon={<ArrowDownTrayIcon className="w-6 h-6" />}
            onClick={handleDownloadPDF}
          >
            Unduh Data (PDF)
          </ButtonV2>
          <ButtonV2
            type="submit"
            className="w-full md:w-fit lg:w-auto bg-primary text-white"
            icon={<ArrowDownTrayIcon className="w-6 h-6" />}
            onClick={handleDownloadExcel}
          >
            Unduh Data (XLS)
          </ButtonV2>
        </div>

        {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4 grid-cols-subgrid"> */}
        {/* <Dropdown
            value={filters.fund_source_id}
            onValueChange={(value) =>
              handleSelectFilter('fund_source_id', value)
            }
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Sumber Dana" />
            </DropdownTrigger>
            <DropdownContent>
              {fundSourceQuery.data?.data?.result.map((fundSource) => (
                <DropdownItem key={fundSource.id} value={fundSource.id}>
                  {fundSource.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.month}
            onValueChange={(value) => handleSelectFilter('month', value)}
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Bulan" />
            </DropdownTrigger>
            <DropdownContent>
              {months.map((month) => (
                <DropdownItem key={month.id} value={month.id}>
                  {month.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.year}
            onValueChange={(value) => handleSelectFilter('year', value)}
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Tahun" />
            </DropdownTrigger>
            <DropdownContent>
              {years.map((year) => (
                <DropdownItem key={year.id} value={year.id}>
                  {year.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.triwulan_id}
            onValueChange={(value) => handleSelectFilter('triwulan_id', value)}
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Triwulan" />
            </DropdownTrigger>
            <DropdownContent>
              {triwulanQuery.data?.data?.map((triwulan) => (
                <DropdownItem key={triwulan.id} value={triwulan.id}>
                  {triwulan.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.tipe_pengadaan}
            onValueChange={(value) =>
              handleSelectFilter('tipe_pengadaan', value)
            }
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Jenis Pengadaan" />
            </DropdownTrigger>
            <DropdownContent>
              {jenisPengadaanData.map((jenisPengadaan) => (
                <DropdownItem
                  key={jenisPengadaan.id}
                  value={jenisPengadaan.name}
                >
                  {jenisPengadaan.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.cara_pengadaan}
            onValueChange={(value) =>
              handleSelectFilter('cara_pengadaan', value)
            }
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Cara Pengadaan" />
            </DropdownTrigger>
            <DropdownContent>
              {caraPengadaanData.map((caraPengadaan) => (
                <DropdownItem key={caraPengadaan.id} value={caraPengadaan.name}>
                  {caraPengadaan.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.bentuk_pengadaan}
            onValueChange={(value) =>
              handleSelectFilter('bentuk_pengadaan', value)
            }
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Bentuk Pengadaan" />
            </DropdownTrigger>
            <DropdownContent>
              {bentukKegiatanData.map((bentuk) => (
                <DropdownItem key={bentuk.id} value={bentuk.name}>
                  {bentuk.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.program_prio}
            onValueChange={(value) => handleSelectFilter('program_prio', value)}
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Program Prioritas" />
            </DropdownTrigger>
            <DropdownContent>
              {programPrioritasData.map((programPrio) => (
                <DropdownItem key={programPrio.id} value={programPrio.name}>
                  {programPrio.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <ButtonV2
            className="px-3 bg-primary text-white w-full col-span-2 lg:col-span-1 place-self-end lg:col-start-4"
            onClick={resetFilter}
          >
            Reset
          </ButtonV2> */}
        {/* </div> */}
      </div>
      <Outlet />
    </>
  );
};

export default ReportTableWrapper;