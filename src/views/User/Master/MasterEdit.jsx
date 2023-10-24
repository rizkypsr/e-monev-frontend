import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import { getOrganizations } from '../../../api/admin/organization';
import { getOccasions } from '../../../api/admin/occasion';
import { getPurposes } from '../../../api/admin/purpose';
import { useToastContext } from '../../../context/ToastContext';
import { createMaster } from '../../../api/user/master';
import formattedDate from '../../../utils/formattedDate';

import getTriwulan from '../../../api/static/getTriwulan';
import DropdownDialog from '../../../components/DropdownDialog';
import getMasterDetail from '../../../api/user/master/getMasterDetail';
import updateMaster from '../../../api/user/master/updateMaster';

const initalParams = {
  limit: 0,
  page: 1,
  sort: 'terbaru',
};

const initialOccassions = [
  {
    selected: null,
  },
];

const MasterEdit = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedTriwulan, setSelectedTriwulan] = useState(null);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [occassionsError, setOccassionsError] = useState(null);

  const [occassions, setOccassions] = useState(initialOccassions);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_master'],
    queryFn: () => getMasterDetail(id, authHeader()),
    onSuccess: (result) => {
      const data = result.data.result;

      setValue('created_at', formattedDate(new Date(data.created_at)));
      setValue('triwulan', data.triwulan?.id);
      setValue('opd', data.organization?.id);

      setSelectedOpd(data.organization);
      setSelectedTriwulan(data.triwulan);

      // setReport({
      //   id: data.id,
      //   description: data.description,
      //   occassion: data.occassion?.title,
      //   organization: data.organization?.title,
      //   program: data.program?.title,
      //   program_description: data.program_description,
      //   triwulan: data.triwulan?.name,
      //   created_at: data.created_at,
      // });
    },
  });

  const triwulanQuery = useInfiniteQuery({
    queryKey: ['get_triwulan'],
    queryFn: ({ pageParam = 1 }) => getTriwulan(authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const opdQuery = useInfiniteQuery({
    queryKey: ['get_organizations'],
    queryFn: ({ pageParam = 1 }) =>
      getOrganizations(initalParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const occassionQuery = useInfiniteQuery({
    queryKey: ['get_occassions'],
    queryFn: ({ pageParam = 1 }) => getOccasions(initalParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const purposesQuery = useInfiniteQuery({
    queryKey: ['get_purposes'],
    queryFn: ({ pageParam = 1 }) => getPurposes(initalParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const handleSelectTriwulan = (item) => {
    setSelectedTriwulan(item);
    setValue('triwulan', item.id);
  };

  const handleSelectOpd = (item) => {
    setSelectedOpd(item);
    setValue('opd', item.id);
  };

  const handleSelectOccassion = (item, index) => {
    setOccassions((prevOccassions) => {
      const updatedOccassions = [...prevOccassions];
      updatedOccassions[index] = { selected: item };
      return updatedOccassions;
    });
  };

  const handleSelectPurpose = (item) => {
    setSelectedPurpose(item);
    setValue('purpose', item.id);
  };

  const addOccasionComponent = () => {
    setOccassions([
      ...occassions,
      {
        selected: null,
      },
    ]);
  };

  const removeOccasionComponent = (indexToRemove) => {
    const newOccasions = occassions.filter(
      (_, index) => index !== indexToRemove
    );
    setOccassions(newOccasions);
  };

  const updateMutation = useMutation(updateMaster);

  const onSubmit = () => {
    setOccassionsError(null);

    for (let index = 0; index < occassions.length; index += 1) {
      if (occassions[index].selected === null) {
        setOccassionsError('Pastikan semua data terisi');
        return;
      }
    }

    updateMutation.mutate(
      {
        body: {
          triwulan_id: selectedTriwulan.id,
          organization_id: selectedOpd.id,
          purpose_id: selectedPurpose.id,
          occassions: occassions.map((ocs) => Number(ocs.selected.id)),
          data_master_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil mengubah Data Master');
          navigate('/laporan/data-master');
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Ubah Data Master</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form className="w-4/5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 space-x-3">
            <div className="flex-grow">
              <Label className="mb-2">Tanggal</Label>
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
            <div className="flex-grow">
              <Label className="mb-2">Triwulan</Label>
              <DropdownDialog
                label="Pilih Triwulan"
                data={triwulanQuery.data}
                value={selectedTriwulan}
                onChange={handleSelectTriwulan}
                register={register('triwulan', {
                  required: {
                    message: 'Triwulan wajib dipilih',
                    value: true,
                  },
                })}
                error={errors.triwulan?.message}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2">Organisasi Perangkat Daerah (OPD)</Label>
            <DropdownDialog
              label="Pilih OPD"
              data={opdQuery.data}
              value={selectedOpd}
              maxWidth="max-w-full"
              onChange={handleSelectOpd}
              register={register('opd', {
                required: {
                  message: 'OPD wajib dipilih',
                  value: true,
                },
              })}
              error={errors.opd?.message}
            />
          </div>
          <div>
            <Label className="mb-2">Urusan</Label>
            <div className="space-y-3">
              {occassions.map((opd, index) => (
                <DropdownDialog
                  label="Pilih Urusan"
                  data={occassionQuery.data}
                  value={opd.selected}
                  maxWidth="max-w-full"
                  onChange={(value) => handleSelectOccassion(value, index)}
                  onDelete={index > 0 && (() => removeOccasionComponent(index))}
                />
              ))}
            </div>
          </div>
          {occassionsError && (
            <p className="mt-2 text-xs text-red-600">{occassionsError}</p>
          )}
          <div>
            <Button
              onClick={addOccasionComponent}
              textColor="text-[#2F80ED]"
              icon={<PlusCircleIcon className="w-8 h-8" />}
            >
              Tambah Urusan Lain
            </Button>
          </div>
          <div>
            <Label className="mb-2">Sasaran RPJMD</Label>
            <DropdownDialog
              label="Pilih Sasaran RPJMD"
              data={purposesQuery.data}
              value={selectedPurpose}
              maxWidth="max-w-full"
              onChange={handleSelectPurpose}
              register={register('purpose', {
                required: {
                  message: 'Sasaran wajib dipilih',
                  value: true,
                },
              })}
              error={errors.purpose?.message}
            />
          </div>

          {updateMutation.isLoading ? (
            <ReactLoading />
          ) : (
            <div className="flex space-x-3 !mt-10">
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
                  className="w-full md:w-28 font-medium"
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

export default MasterEdit;
