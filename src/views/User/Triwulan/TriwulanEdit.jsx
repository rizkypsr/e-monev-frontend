import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import formattedDate from '../../../utils/formattedDate';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import getFundSource from '../../../api/user/triwulan/getFundSource';
import createTriwulan from '../../../api/user/triwulan/createTriwulan';
import DropdownDialog from '../../../components/DropdownDialog';
import getProcurementType from '../../../api/user/triwulan/getProcurementType';
import getProcurementMethod from '../../../api/user/triwulan/getProcurementMethod';
import { useToastContext } from '../../../context/ToastContext';
import FileInput from '../../../components/FileInput';
import getTriwulanDetail from '../../../api/user/triwulan/getTriwulanDetail';
import updateTriwulan from '../../../api/user/triwulan/updateTriwulan';

const initialParams = {
  page: 1,
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

const TriwulanEdit = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedFundSource, setSelectedFundSource] = useState(null);
  const [selectedProcurementType, setSelectedProcurementType] = useState(null);
  const [selectedProcurementMethod, setSelectedProcurementMethod] =
    useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulanDetail(id, authHeader()),
    onSuccess: (result) => {
      const triwulanData = result.data;

      setSelectedFundSource(triwulanData.fundSource);

      setValue('activity_name', triwulanData.activity_name);
      setValue('activity_location', triwulanData.activity_location);
      setValue('fund_source_id', triwulanData.fund_source_id);
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
      setValue('procurement_type', triwulanData.procurement_type);
      setValue('procurement_method', triwulanData.procurement_method);
      setValue('user_id', triwulanData.user_id);
      setValue('activity_name', triwulanData.activity_name);
      setValue('activity_name', triwulanData.activity_name);
      setValue('activity_name', triwulanData.activity_name);
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

  const updateMutation = useMutation(updateTriwulan);

  const onSubmit = (data) => {
    const formData = new FormData();

    const formDataObject = {
      ...data,
      fund_source_id: Number(selectedFundSource?.id),
      procurement_type_id: selectedProcurementType?.id,
      procurement_method_id: selectedProcurementMethod?.id,
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

    updateMutation.mutate(
      {
        id,
        body: formData,
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil mengubah Data Triwulan');
          navigate('/laporan/data-triwulan?limit=10&page=1&sort=terbaru');
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
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
        <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
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
              <Label className="mb-2">Nama Kegiatan</Label>
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
              <Label className="mb-2">Pagu Dana (Rp)</Label>
              <TextInput
                id="fund_ceiling"
                name="fund_ceiling"
                placeholder="Tulis Disini..."
                register={register('fund_ceiling', {
                  valueAsNumber: true,
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
              <Label className="mb-2">Nomor dan Tanggal Kontrak</Label>
              <TextInput
                id="contract_number_date"
                name="contract_number_date"
                placeholder="Tulis Disini..."
                register={register('contract_number_date')}
                error={errors.contract_number_date?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nama Kontraktor</Label>
              <TextInput
                id="contractor_name"
                name="contractor_name"
                placeholder="Tulis Disini..."
                register={register('contractor_name')}
                error={errors.contractor_name?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jangka Waktu Pelaksanaan</Label>
              <TextInput
                id="implementation_period"
                name="implementation_period"
                placeholder="Tulis Disini..."
                register={register('implementation_period')}
                error={errors.implementation_period?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Nilai Kontrak</Label>
              <TextInput
                id="contract_value"
                name="contract_value"
                placeholder="Tulis Disini..."
                register={register('contract_value', {
                  valueAsNumber: true,
                })}
                error={errors.contract_value?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Realisasi Fisik</Label>
              <TextInput
                id="physical_realization"
                name="physical_realization"
                placeholder="Tulis Disini..."
                register={register('physical_realization', {
                  valueAsNumber: true,
                })}
                error={errors.physical_realization?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Realisasi Keuangan</Label>
              <TextInput
                id="fund_realization"
                name="fund_realization"
                placeholder="Tulis Disini..."
                register={register('fund_realization', {
                  valueAsNumber: true,
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
              <Label className="mb-2">Jumlah Tenaga Kerja (Lokal)</Label>
              <TextInput
                id="local_workforce"
                name="local_workforce"
                placeholder="Tulis Disini..."
                register={register('local_workforce', {
                  valueAsNumber: true,
                })}
                error={errors.local_workforce?.message}
              />
            </div>
            <div>
              <Label className="mb-2">Jumlah Tenaga Kerja (Non Lokal)</Label>
              <TextInput
                id="non_local_workforce"
                name="non_local_workforce"
                placeholder="Tulis Disini..."
                register={register('non_local_workforce', {
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

          {updateMutation.isLoading ? (
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

export default TriwulanEdit;
