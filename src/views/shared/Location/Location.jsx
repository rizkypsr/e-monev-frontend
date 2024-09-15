import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import MapLocation from '../../../components/MapLocation';
import DropdownDialog from '../../../components/DropdownDialog';
import { getActivities } from '../../../api/admin/activity';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import getUsers from '../../../api/user/triwulan/getUsers';

const jenisPengadaan = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: [
          { id: 1, name: 'Barang' },
          { id: 2, name: 'Pekerjaan Konstruksi' },
          { id: 3, name: 'Jasa Konsultasi' },
          { id: 4, name: 'Jasa Lainnya' },
          { id: 5, name: 'Jasa Kelola' },
        ],
        total: 4,
      },
    },
  ],
};

const optional = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: [
          { id: 1, name: 'Forst Major' },
          { id: 2, name: 'Keterlambatan Lelang' },
          { id: 3, name: 'Perubahan Kebijakan Adendum' },
        ],
        total: 3,
      },
    },
  ],
};

const caraPengadaan = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: [
          { id: 1, name: 'Swakelola' },
          { id: 2, name: 'Pengadaan Langsung' },
          { id: 3, name: 'Seleksi' },
          { id: 4, name: 'Tender' },
          { id: 5, name: 'Penunjukan Langsung' },
        ],
        total: 4,
      },
    },
  ],
};

const bentukKegiatan = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: [
          { id: 1, name: 'fisik' },
          { id: 2, name: 'nonfisik' },
        ],
        total: 4,
      },
    },
  ],
};

const programPrioritas = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: [
          { id: 1, name: 'Bukan Prioritas' },
          { id: 2, name: 'Daerah' },
          { id: 3, name: 'Nasional' },
        ],
        total: 4,
      },
    },
  ],
};

const initialParams = {
  limit: 20,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const Location = () => {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const [filterParams, setFilterParams] = React.useState({
    fund_source_id: null,
    procurement_type: null,
    procurement_method: null,
    optional: null,
    activity_id: null,
    activity_form: null,
    program_prio: null,
    createdByUid: null,
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

  const activityQuery = useInfiniteQuery({
    queryKey: ['get_activities'],
    queryFn: async ({ pageParam = 1 }) => {
      const params = initialParams;

      params.page = pageParam;

      const res = await getActivities(params, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const fundSourceQuery = useInfiniteQuery({
    queryKey: ['get_fund_source'],
    queryFn: ({ pageParam = 1 }) => getFundSource(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const handleOnChange = (key, value) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-12">Lokasi Kegiatan</h1>
      <div className="mb-6 grid grid-cols-4 gap-2">
        {authUser()?.role.name === 'Superadmin' && (
          <DropdownDialog
            name="createdByUid"
            label="Pilih Target OPD"
            data={targetOpdQuery.data}
            value={filterParams.createdByUid}
            onChangeV2={handleOnChange}
          />
        )}

        <DropdownDialog
          name="procurement_type"
          label="Pilih Jenis Pengadaan"
          data={jenisPengadaan}
          value={filterParams.procurement_type}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="procurement_method"
          label="Pilih Cara Pengadaan"
          data={caraPengadaan}
          value={filterParams.procurement_method}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="optional"
          label="Pilih Opsional"
          data={optional}
          value={filterParams.optional}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="activity_form"
          label="Pilih Bentuk Kegiatan"
          data={bentukKegiatan}
          value={filterParams.activity_form}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="program_prio"
          label="Pilih Program Prioritas"
          data={programPrioritas}
          value={filterParams.program_prio}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="activity_id"
          label="Pilih Sub Kegiatan"
          data={activityQuery.data}
          value={filterParams.activity_id}
          onChangeV2={handleOnChange}
        />
        <DropdownDialog
          name="fund_source_id"
          label="Pilih Sumber Dana"
          data={fundSourceQuery.data}
          value={filterParams.fund_source_id}
          onChangeV2={handleOnChange}
        />
      </div>
      <MapLocation />
    </>
  );
};

export default Location;
