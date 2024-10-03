/* eslint-disable no-unused-vars */
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';

import Label from '../../../components/Label';
import formattedDate from '../../../utils/formattedDate';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import createTriwulan from '../../../api/user/triwulan/createTriwulan';
import DropdownDialog from '../../../components/DropdownDialog';
import { useToastContext } from '../../../context/ToastContext';
import FileInput from '../../../components/FileInput';
import { getActivities } from '../../../api/admin/activity';
import CurrencyInput from '../../../components/CurrencyInput';
import PercentageInput from '../../../components/PercentageInput';
import getUsers from '../../../api/user/triwulan/getUsers';
import TextInputV2 from '../../../components/TextInputV2';
import LocationInput from '../../../components/LocationInput';
import getTriwulanDetail from '../../../api/user/triwulan/getTriwulanDetail';
import {
  bentukKegiatanData,
  caraPengadaanData,
  jenisPengadaanData,
  optionalData,
  programPrioritasData,
} from './constants';
import updateTriwulan from '../../../api/user/triwulan/updateTriwulan';

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
        result: jenisPengadaanData,
        total: 4,
      },
    },
  ],
};

const optionals = {
  pageParams: [undefined],
  pages: [
    {
      data: {
        page: 1,
        pages: 1,
        result: optionalData,
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

const TriwulanForm = () => {
  const { id } = useParams();

  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulanDetail(id, authHeader()),
    enabled: !!id,
    onSuccess: (result) => {
      const triwulanData = result.data[0] ?? {};

      setValue('createdByUid', triwulanData.createdBy);
      setValue('activity_name', triwulanData.activity_name);
      setValue('activity_location', triwulanData.activity_location);
      setValue('fund_source_id', triwulanData.fundSource);
      setValue('fund_ceiling', triwulanData.fund_ceiling || '');
      setValue('management_organization', triwulanData.management_organization);
      setValue('pptk_name', triwulanData.pptk_name);
      setValue('contract_number_date', triwulanData.contract_number_date);
      setValue('contractor_name', triwulanData.contractor_name);
      setValue('implementation_period', triwulanData.implementation_period);
      setValue('physical_realization', triwulanData.physical_realization);
      setValue('fund_realization', triwulanData.fund_realization);
      setValue('activity_volume', triwulanData.activity_volume);
      setValue('activity_output', triwulanData.activity_output);
      setValue('direct_target_group', triwulanData.direct_target_group);
      setValue('indirect_target_group', triwulanData.indirect_target_group);
      setValue('local_workforce', triwulanData.local_workforce);
      setValue('non_local_workforce', triwulanData.non_local_workforce);
      setValue('problems', triwulanData.problems);
      setValue('solution', triwulanData.solution);
      setValue(
        'procurement_type',
        jenisPengadaanData.find(
          (item) => item.name === triwulanData.procurement_type
        )
      );
      setValue(
        'procurement_method',
        caraPengadaanData.find(
          (item) => item.name === triwulanData.procurement_method
        )
      );
      setValue('user_id', triwulanData.user_id);
      setValue('activity_name', triwulanData.activity_name);
      setValue('activity_id', triwulanData.activity);
      setValue(
        'activity_form',
        bentukKegiatanData.find((item) => item.id === triwulanData.activity_form)
      );
      setValue(
        'optional',
        optionalData.find((item) => item.name === triwulanData.optional)
      );
      setValue(
        'program_prio',
        programPrioritasData.find(
          (item) => item.name === triwulanData.program_prio
        )
      );
      setValue('contract_date', triwulanData.contract_date);
      setValue('pic_name', triwulanData.pic_name);
      setValue('leader_name', triwulanData.leader_name);
      setValue('reason', triwulanData.reason);
    },
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

  const createMutation = useMutation(createTriwulan);
  const updateMutation = useMutation(updateTriwulan);

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    const formDataObject = {
      ...data,
      fund_source_id: data.fund_source_id?.id,
      procurement_type: data.procurement_type?.name,
      procurement_method: data.procurement_method?.name,
      activity_id: data.activity_id?.id,
      activity_form: data.activity_form?.id,
      optional: data.optional?.name,
      contract_date: formattedDate(data?.contract_date),
      createdByUid: data.createdByUid ? Number(data.createdByUid.id) : null,
      activity_location: JSON.parse(data.activity_location),
      program_prio: data.program_prio?.name,
    };

    // Append non-file fields to FormData
    // eslint-disable-next-line no-restricted-syntax
    for (const key in formDataObject) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        formDataObject.hasOwnProperty(key) &&
        formDataObject[key] &&
        key !== 'file'
      ) {
        formData.append(key, formDataObject[key]);
      }
    }

    if (data.file) {
      if (Array.isArray(data.file)) {
        data.file.forEach((file) => formData.append('file', file));
      } else {
        formData.append('file', data.file);
      }
    }

    if (id) {
      updateMutation.mutate(
        {
          id,
          body: formData,
          token: authHeader(),
        },
        {
          onSuccess: () => {
            showToastMessage('Berhasil mengubah Data Kegiatan');
            navigate('/laporan/data-triwulan?limit=10&page=1&sort=terbaru');
          },
          onError: (err) => {
            showToastMessage(err.message, 'error');
          },
        }
      );

      return;
    }

    createMutation.mutate(
      {
        body: formData,
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Data Kegiatan');
          navigate('/laporan/data-triwulan?limit=10&page=1&sort=terbaru');
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  const handleFileInput = (files) => {
    setValue('file', files);
  };

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Kegiatan</h1>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form id="main" className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {authUser()?.role.name === 'Superadmin' && (
              <div className="mb-2 col-span-2">
                <Label className="mb-2">Target OPD</Label>

                <Controller
                  control={control}
                  name="createdByUid"
                  render={({ field }) => (
                    <DropdownDialog
                      label="Pilih Target OPD"
                      data={targetOpdQuery.data}
                      {...field}
                    />
                  )}
                />
              </div>
            )}

            <div className="mb-2">
              <Label className="mb-2">Lokasi Kegiatan</Label>
              <LocationInput
                name="activity_location"
                label="Pilih Lokasi Kegiatan"
                placeholder="Pilih lokasi kegiatan"
                register={register}
                setValue={setValue}
                error={errors.activity_location?.message}
              />
            </div>

            <div>
              <Label className="mb-2">Output Sub Kegiatan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('activity_name', {
                  required: 'Nama Kegiatan wajib diisi!',
                })}
                error={errors.activity_name?.message}
              />
            </div>

            <div>
              <Label className="mb-2">Sumber Dana</Label>
              <Controller
                control={control}
                name="fund_source_id"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Sumber Dana"
                    data={fundSourceQuery.data}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <CurrencyInput
                name="fund_ceiling"
                label="Pagu Dana (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('fund_ceiling', {
                  required: 'Pagu Dana wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <Label className="mb-2">OPD Pengelola</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('management_organization')}
                error={errors.management_organization?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama PPTK</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('pptk_name')}
                error={errors.pptk_name?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nomor Kontrak</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('contract_number_date', {
                  required: false,
                })}
                error={errors.pptk_name?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Tanggal Kontrak</Label>
              <TextInputV2
                type="date"
                register={register('contract_date', {
                  valueAsDate: true,
                })}
                error={errors.contract_date?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama Penyedia</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('contractor_name', {
                  required: false,
                })}
                error={errors.contractor_name?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jangka Waktu Pelaksanaan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('implementation_period', {
                  required: false,
                })}
                error={errors.implementation_period?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama Penanggung Jawab</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('pic_name')}
                error={errors.pic_name?.message}
              />
            </div>
            <div>
              <CurrencyInput
                name="contract_value"
                label="Nilai Kontrak (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('contract_value', {
                  required: false,
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <CurrencyInput
                name="physical_realization"
                label="Realisasi Fisik (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('physical_realization', {
                  required: 'Realisasi Fisik wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <PercentageInput
                name="physical_realization_percentage"
                label="Realisasi Fisik (Dalam bentuk persentase angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('physical_realization_percentage', {
                  required: 'Realisasi Fisik wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <CurrencyInput
                name="fund_realization"
                label="Realisasi Keuangan (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('fund_realization', {
                  required: 'Realisasi Keuangan wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <PercentageInput
                name="fund_realization_percentage"
                label="Realisasi Keuangan (Dalam bentuk persentase angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('fund_realization_percentage', {
                  required: 'Realisasi Keuangan wajib diisi!',
                  valueAsNumber: true,
                  max: {
                    message: 'Maksimal Rp.200.000.000.000.000',
                    value: 200000000000000000,
                  },
                })}
              />
            </div>
            <div>
              <Label className="mb-2">Volume Kegiatan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('activity_volume')}
                error={errors.activity_volume?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Output Kegiatan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('activity_output')}
                error={errors.activity_output?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Manfaat Kegiatan (Kelompok sasaran Langsung)
              </Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('direct_target_group')}
                error={errors.direct_target_group?.message}
              />
            </div>
            <div>
              <Label className="mb-2">
                Manfaat Kegiatan (Kelompok sasaran Tidak Langsung)
              </Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('indirect_target_group')}
                error={errors.indirect_target_group?.message}
              />
            </div>
            <div>
              <CurrencyInput
                name="local_workforce"
                label="Jumlah Tenaga Kerja Lokal (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('local_workforce', {
                  required: 'Jumlah Tenaga Kerja Lokal wajib diisi!',
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              <CurrencyInput
                name="non_local_workforce"
                label="Jumlah Tenaga Kerja Non Lokal (Dalam bentuk angka)"
                control={control}
                placeholder="Tulis Disini..."
                {...register('non_local_workforce', {
                  required: 'Jumlah Tenaga Kerja Non Lokal wajib diisi!',
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              <Label className="mb-2">Hambatan dan Permasalahan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('problems')}
                error={errors.problems?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Solusi Permasalahan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('solution')}
                error={errors.solution?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jenis Pengadaan</Label>
              <Controller
                control={control}
                name="procurement_type"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Jenis Pengadaan"
                    data={jenisPengadaan}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label className="mb-2">Cara Pengadaan</Label>
              <Controller
                control={control}
                name="procurement_method"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Cara Pengadaan"
                    data={caraPengadaan}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label className="mb-2">Sub Kegiatan</Label>
              <Controller
                control={control}
                name="activity_id"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Sub Kegiatan"
                    data={activityQuery.data}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Label className="mb-2">Bentuk Kegiatan</Label>
              <Controller
                control={control}
                name="activity_form"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Bentuk Kegiatan"
                    data={bentukKegiatan}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-2">
              <Label className="mb-2">Opsi</Label>
              <Controller
                control={control}
                name="optional"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Opsi"
                    data={optionals}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Label className="mb-2">Nama Pimpinan</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('leader_name')}
                error={errors.leader_name?.message}
              />
            </div>
            <div className="mb-2">
              <Label className="mb-2">Alasan Terkait</Label>
              <TextInputV2
                placeholder="Tulis Disini..."
                register={register('reason')}
                error={errors.reason?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Program Prioritas</Label>
              <Controller
                control={control}
                name="program_prio"
                render={({ field }) => (
                  <DropdownDialog
                    label="Pilih Program Prioritas"
                    data={programPrioritas}
                    {...field}
                  />
                )}
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
                allowMultiple
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

export default TriwulanForm;