import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import Label from '../../../../components/Label';
import DropdownDialog from '../../../../components/DropdownDialog';
import {
  bentukKegiatanData,
  caraPengadaanData,
  jenisPengadaanData,
  programPrioritasData,
} from '../../../User/Triwulan/constants';
import getFundSource from '../../../../api/user/triwulan/getFundSource';

const jenisPengadaan = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: jenisPengadaanData,
        total: 4,
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
        result: caraPengadaanData,
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
        result: bentukKegiatanData,
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
        result: programPrioritasData,
        total: 4,
      },
    },
  ],
};

const years = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: Array.from({ length: 38 }, (_, i) => ({
          id: (2023 + i).toString(),
          name: (2023 + i).toString(),
        })),
        total: 4,
      },
    },
  ],
};

const initialFundSourceparams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const FilterPanel = ({ filters, onChange }) => {
  const authHeader = useAuthHeader();

  const [fundSourceFilterParams, setFundSourceFilterParams] = React.useState(
    initialFundSourceparams
  );

  const fundSourceQuery = useInfiniteQuery({
    queryKey: ['get_fund_source', fundSourceFilterParams],
    queryFn: async ({ pageParam = 1 }) => {
      const params = fundSourceFilterParams;

      params.page = pageParam;

      const res = await getFundSource(fundSourceFilterParams, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const handleOnSearch = (e) => {
    setFundSourceFilterParams({
      ...fundSourceFilterParams,
      search: e,
    });
  };

  const handleSelectFilter = (key, value) => {
    onChange(key, value);
  };

  return (
    <div className="flex-1">
      <div>
        <Label className="mb-2">Sumber Dana</Label>
        <DropdownDialog
          name="fundSource"
          label="Pilih Sumber Dana"
          data={fundSourceQuery.data}
          value={filters.fundSource}
          onChangeV2={handleSelectFilter}
          searchValue={fundSourceFilterParams.search}
          onSearch={handleOnSearch}
          enableSearch
        />
      </div>

      {filters.fundSource && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-4">
          <div>
            <Label className="mb-2">Jenis Pengadaan</Label>
            <DropdownDialog
              name="jenisPengadaan"
              label="Pilih Jenis Pengadaan"
              value={filters.jenisPengadaan}
              data={jenisPengadaan}
              onChangeV2={handleSelectFilter}
            />
          </div>
          <div>
            <Label className="mb-2">Cara Pengadaan</Label>
            <DropdownDialog
              name="caraPengadaan"
              label="Pilih Cara Pengadaan"
              value={filters.caraPengadaan}
              data={caraPengadaan}
              onChangeV2={handleSelectFilter}
            />
          </div>
          <div>
            <Label className="mb-2">Bentuk Pengadaan</Label>
            <DropdownDialog
              name="bentukKegiatan"
              label="Pilih Bentuk Pengadaan"
              value={filters.bentukKegiatan}
              data={bentukKegiatan}
              onChangeV2={handleSelectFilter}
            />
          </div>
          <div>
            <Label className="mb-2">Program Prioritas</Label>
            <DropdownDialog
              name="programPrioritas"
              label="Pilih Program Prioritas"
              value={filters.programPrioritas}
              data={programPrioritas}
              onChangeV2={handleSelectFilter}
            />
          </div>
          <div>
            <Label className="mb-2">Tahun</Label>
            <DropdownDialog
              name="tahun"
              label="Pilih tahun"
              value={filters.tahun}
              data={years}
              onChangeV2={handleSelectFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
