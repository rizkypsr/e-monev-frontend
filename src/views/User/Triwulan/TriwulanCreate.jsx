import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import formattedDate from '../../../utils/formattedDate';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import createTriwulan from '../../../api/user/triwulan/createTriwulan';
import DropdownDialog from '../../../components/DropdownDialog';
import { useToastContext } from '../../../context/ToastContext';
import FileInput from '../../../components/FileInput';
import { getActivities } from '../../../api/admin/activity';

const initialParams = {
  limit: 20,
  page: 1,
  search: '',
  sort: 'terbaru',
};

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

const TriwulanCreate = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedFundSource, setSelectedFundSource] = useState(null);
  const [selectedProcurementType, setSelectedProcurementType] = useState(null);
  const [selectedProcurementMethod, setSelectedProcurementMethod] =
    useState(null);
  const [selectedActivityForm, setSelectedActivityForm] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   fund_ceiling: 0,
    //   contract_number_date: 0,
    //   contract_value: 0,
    //   physical_realization: 0,
    //   fund_realization: 0,
    //   local_workforce: 0,
    //   non_local_workforce: 0,
    // },
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

  useEffect(() => {
    setValue('created_at', formattedDate(Date.now()));
  }, []);

  const createMutation = useMutation(createTriwulan);

  const onSubmit = (data) => {
    const formData = new FormData();

    const formDataObject = {
      ...data,
      fund_source_id: selectedFundSource?.id,
      procurement_type: selectedProcurementType?.name,
      procurement_method: selectedProcurementMethod?.name,
      activity_id: selectedActivity?.id,
      activity_form: selectedActivityForm?.id,
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const key in formDataObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (formDataObject.hasOwnProperty(key)) {
        if (formDataObject[key]) {
          formData.append(key, formDataObject[key]);
        }
      }
    }

    createMutation.mutate(
      {
        body: formData,
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Data Triwulan');
          navigate('/laporan/data-triwulan?limit=10&page=1&sort=terbaru');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  const handleSelectFundSource = (item) => {
    setSelectedFundSource(item);
  };

  const handleSelectProcurementType = (item) => {
    setSelectedProcurementType(item);
  };

  const handleSelectActivityForm = (item) => {
    setSelectedActivityForm(item);
  };

  const handleSelectActivity = (item) => {
    setSelectedActivity(item);
  };

  const handleSelectProcurementMethod = (item) => {
    setSelectedProcurementMethod(item);
  };

  const handleFileInput = (file) => {
    setValue('file', file);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Triwulan</h1>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form id="main" className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="col-span-2">
              <Label>Tanggal Input Data</Label>
              <TextInput
                id="created_at"
                name="created_at"
                width="w-full"
                register={register('created_at', {
                  disabled: true,
                })}
                error={errors.created_at?.message}
              />
            </div>

            <div>
              <Label className="mb-2">Output Sub Kegiatan</Label>
              <TextInput
                id="activity_name"
                name="activity_name"
                placeholder="Tulis Disini..."
                register={register('activity_name', {
                  required: 'Nama Kegiatan wajib diisi!',
                })}
                error={errors.activity_name?.message}
              />
            </div>

            <div>
              <Label className="mb-2">Lokasi Kegiatan</Label>
              <TextInput
                id="activity_location"
                name="activity_location"
                placeholder="Tulis Disini..."
                register={register('activity_location', {
                  required: 'Lokasi Kegiatan wajib diisi!',
                })}
                error={errors.activity_location?.message}
              />
            </div>

            <div>
              <Label className="mb-2">Sumber Dana</Label>
              <DropdownDialog
                label="Pilih Sumber Dana"
                data={fundSourceQuery.data}
                value={selectedFundSource}
                onChange={handleSelectFundSource}
              />
            </div>
            <div>
              <Label className="mb-2">Pagu Dana (Dalam bentuk angka)</Label>
              <TextInput
                id="fund_ceiling"
                type="number"
                name="fund_ceiling"
                placeholder="Tulis Disini..."
                register={register('fund_ceiling', {
                  required: 'Pagu Dana wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
                error={errors.fund_ceiling?.message}
              />
            </div>

            <div>
              <Label className="mb-2">OPD Pengelola</Label>
              <TextInput
                id="management_organization"
                name="management_organization"
                placeholder="Tulis Disini..."
                register={register('management_organization')}
                error={errors.management_organization?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama PPTK</Label>
              <TextInput
                id="pptk_name"
                name="pptk_name"
                placeholder="Tulis Disini..."
                register={register('pptk_name')}
                error={errors.pptk_name?.message}
              />
            </div>

            <div>
              <Label className="mb-2">
                Nomor dan Tanggal Kontrak (Dalam bentuk angka)
              </Label>
              <TextInput
                id="contract_number_date"
                type="number"
                name="contract_number_date"
                placeholder="Tulis Disini..."
                register={register('contract_number_date', {
                  required: false,
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
                error={errors.contract_number_date?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama Kontraktor</Label>
              <TextInput
                id="contractor_name"
                name="contractor_name"
                placeholder="Tulis Disini..."
                register={register('contractor_name', {
                  required: false,
                })}
                error={errors.contractor_name?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jangka Waktu Pelaksanaan</Label>
              <TextInput
                id="implementation_period"
                name="implementation_period"
                placeholder="Tulis Disini..."
                register={register('implementation_period', {
                  required: false,
                })}
                error={errors.implementation_period?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nilai Kontrak (Dalam bentuk angka)</Label>
              <TextInput
                id="contract_value"
                type="number"
                name="contract_value"
                placeholder="Tulis Disini..."
                register={register('contract_value', {
                  required: false,
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
                error={errors.contract_value?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Realisasi Fisik (Dalam bentuk angka)
              </Label>
              <TextInput
                id="physical_realization"
                type="number"
                name="physical_realization"
                placeholder="Tulis Disini..."
                register={register('physical_realization', {
                  required: 'Realisasi Fisik wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
                error={errors.physical_realization?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Realisasi Keuangan (Dalam bentuk angka)
              </Label>
              <TextInput
                id="fund_realization"
                type="number"
                name="fund_realization"
                placeholder="Tulis Disini..."
                register={register('fund_realization', {
                  required: 'Realisasi Keuangan wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
                error={errors.fund_realization?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Volume Kegiatan</Label>
              <TextInput
                id="activity_volume"
                name="activity_volume"
                placeholder="Tulis Disini..."
                register={register('activity_volume')}
                error={errors.activity_volume?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Output Kegiatan</Label>
              <TextInput
                id="activity_output"
                name="activity_output"
                placeholder="Tulis Disini..."
                register={register('activity_output')}
                error={errors.activity_output?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Manfaat Kegiatan (Kelompok sasaran Langsung)
              </Label>
              <TextInput
                id="direct_target_group"
                name="direct_target_group"
                placeholder="Tulis Disini..."
                register={register('direct_target_group')}
                error={errors.direct_target_group?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Manfaat Kegiatan (Kelompok sasaran Tidak Langsung)
              </Label>
              <TextInput
                id="indirect_target_group"
                name="indirect_target_group"
                placeholder="Tulis Disini..."
                register={register('indirect_target_group')}
                error={errors.indirect_target_group?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Jumlah Tenaga Kerja Lokal (Dalam bentuk angka)
              </Label>
              <TextInput
                id="local_workforce"
                type="number"
                name="local_workforce"
                placeholder="Tulis Disini..."
                register={register('local_workforce', {
                  required: 'Jumlah Tenaga Kerja Lokal wajib diisi!',
                  valueAsNumber: true,
                })}
                error={errors.local_workforce?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Jumlah Tenaga Kerja Non Lokal (Dalam bentuk angka)
              </Label>
              <TextInput
                id="non_local_workforce"
                name="non_local_workforce"
                placeholder="Tulis Disini..."
                register={register('non_local_workforce', {
                  required: 'Jumlah Tenaga Kerja Non Lokal wajib diisi!',
                  valueAsNumber: true,
                })}
                error={errors.non_local_workforce?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Hambatan dan Permasalahan</Label>
              <TextInput
                id="problems"
                name="problems"
                placeholder="Tulis Disini..."
                register={register('problems')}
                error={errors.problems?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Solusi Permasalahan</Label>
              <TextInput
                id="solution"
                name="solution"
                placeholder="Tulis Disini..."
                register={register('solution')}
                error={errors.solution?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jenis Pengadaan</Label>
              <DropdownDialog
                label="Pilih Jenis Pengadaan"
                data={jenisPengadaan}
                value={selectedProcurementType}
                onChange={handleSelectProcurementType}
              />
            </div>

            <div className="mb-4">
              <Label className="mb-2">Cara Pengadaan</Label>
              <DropdownDialog
                label="Pilih Cara Pengadaan"
                data={caraPengadaan}
                value={selectedProcurementMethod}
                onChange={handleSelectProcurementMethod}
              />
            </div>

            <div className="mb-4">
              <Label className="mb-2">Sub Kegiatan</Label>
              <DropdownDialog
                label="Pilih Sub Kegiatan"
                data={activityQuery.data}
                value={selectedActivity}
                onChange={handleSelectActivity}
              />
            </div>

            <div className="mb-4">
              <Label className="mb-2">Bentuk Kegiatan</Label>
              <DropdownDialog
                label="Pilih Bentuk Kegiatan"
                data={bentukKegiatan}
                value={selectedActivityForm}
                onChange={handleSelectActivityForm}
              />
            </div>

            <div>
              <FileInput
                className="w-full"
                label="UPLOAD PDF, JPG,PNG, Video (5 MB)"
                icon={<CheckCircleIcon className="w-5 h-5" />}
                handleFile={handleFileInput}
                register={register}
                error={errors.file?.message}
              />
            </div>
          </div>

          {createMutation.isLoading ? (
            <ReactLoading />
          ) : (
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="w-full md:w-28"
                background="bg-primary"
                textColor="text-white"
                icon={<CheckCircleIcon className="w-5 h-5" />}
              >
                Simpan
              </Button>
              <Link to="../">
                <Button
                  className="w-full font-medium md:w-28"
                  background="bg-[#EAEAEA]"
                  textColor="text-dark-gray"
                >
                  Batal
                </Button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TriwulanCreate;
