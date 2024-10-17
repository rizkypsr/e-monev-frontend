import React from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';

import MapLocation from '@/components/MapLocation';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '@/components/DropdownSelectV2';

import getFundSource from '@/api/user/triwulan/getFundSource';
import getUsers from '@/api/user/triwulan/getUsers';
import getTriwulanReportLocation from '@/api/admin/report/getTriwulanReportLokasi';

import {
  caraPengadaanData,
  jenisPengadaanData,
  bentukKegiatanData,
  optionalData,
  programPrioritasData,
} from '@/views/User/Triwulan/constants';

const initialParams = {
  search: '',
  sort: 'terbaru',
};

const Location = () => {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const [filterParams, setFilterParams] = React.useState({
    sumber_dana: null,
    procurement_type: null,
    procurement_method: null,
    optional_notice: null,
    activity_id: null,
    activity_form: null,
    program_prioritas: null,
    target_opd: null,
  });

  const targetOpdQuery = useInfiniteQuery({
    queryKey: ['get_opd'],
    queryFn: async ({ pageParam = 1 }) => {
      const params = {
        ...initialParams,
        limit: 0,
        role_id: 2,
      };

      params.page = pageParam;

      const res = await getUsers(params, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const targetOpdData = (targetOpdQuery.data?.pages ?? [{ result: [] }])[0]
    ?.data?.result;

  const fundSourceQuery = useInfiniteQuery({
    queryKey: ['get_fund_source'],
    queryFn: () => getFundSource(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const fundsourceData = (fundSourceQuery.data?.pages ?? [{ result: [] }])[0]
    ?.data?.result;

  const { data } = useQuery({
    queryKey: ['get_triwulan_reports', filterParams],
    queryFn: () => getTriwulanReportLocation(filterParams, authHeader()),
  });

  const locations = (data?.data?.result ?? []).map((e) => e.activity_location);

  const handleOnChange = (key, value) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-12">Lokasi Kegiatan</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {authUser()?.role.name === 'Superadmin' && (
          <Dropdown
            value={filterParams.createdByUid}
            onValueChange={(value) => handleOnChange('createdByUid', value)}
          >
            <DropdownTrigger>
              <DropdownValue placeholder="Pilih Target OPD" />
            </DropdownTrigger>
            <DropdownContent>
              {targetOpdData?.map((e) => (
                <DropdownItem key={e.name} value={e.id}>
                  {e.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        )}

        <Dropdown
          value={filterParams.jenis_pengadaan}
          onValueChange={(value) => handleOnChange('jenis_pengadaan', value)}
        >
          <DropdownTrigger>
            <DropdownValue placeholder="Pilih Jenis Pengadaan" />
          </DropdownTrigger>
          <DropdownContent>
            {jenisPengadaanData.map((jenisPengadaan) => (
              <DropdownItem key={jenisPengadaan.id} value={jenisPengadaan.name}>
                {jenisPengadaan.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <Dropdown
          value={filterParams.cara_pengadaan}
          onValueChange={(value) => handleOnChange('cara_pengadaan', value)}
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
          value={filterParams.optional}
          onValueChange={(value) => handleOnChange('optional', value)}
        >
          <DropdownTrigger>
            <DropdownValue placeholder="Pilih Optional Pengadaan" />
          </DropdownTrigger>
          <DropdownContent>
            {optionalData.map((e) => (
              <DropdownItem key={e.id} value={e.name}>
                {e.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <Dropdown
          value={filterParams.bentuk_kegiatan}
          onValueChange={(value) => handleOnChange('bentuk_kegiatan', value)}
        >
          <DropdownTrigger>
            <DropdownValue placeholder="Pilih Bentuk Pengadaan" />
          </DropdownTrigger>
          <DropdownContent>
            {bentukKegiatanData.map((e) => (
              <DropdownItem key={e.id} value={e.name}>
                {e.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <Dropdown
          value={filterParams.program_prio}
          onValueChange={(value) => handleOnChange('program_prio', value)}
        >
          <DropdownTrigger>
            <DropdownValue placeholder="Pilih Bentuk Pengadaan" />
          </DropdownTrigger>
          <DropdownContent>
            {programPrioritasData.map((e) => (
              <DropdownItem key={e.id} value={e.name}>
                {e.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <Dropdown
          value={filterParams.fund_source_id}
          onValueChange={(value) => handleOnChange('fund_source_id', value)}
        >
          <DropdownTrigger>
            <DropdownValue placeholder="Pilih Sumber Dana" />
          </DropdownTrigger>
          <DropdownContent>
            {fundsourceData?.map((e) => (
              <DropdownItem key={e.id} value={e.id}>
                {e.name}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
      <MapLocation data={locations} />
    </>
  );
};

export default Location;
