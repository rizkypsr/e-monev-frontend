import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import { getOrganizations } from '../../../api/admin/organization';
import DialogInputWrapper from '../../../components/DialogInputWrapper';
import { getOccasions } from '../../../api/admin/occasion';
import { getPurposes } from '../../../api/admin/purpose';
import DropdownWrapper from '../../../components/DropdownWrapper';
import { useToastContext } from '../../../context/ToastContext';
import { createMaster } from '../../../api/user/master';
import formattedDate from '../../../utils/formattedDate';
import {
  resetAll,
  setIndicator,
  setOccasions,
  setOrganization,
  setProgram,
  setPurpose,
  setTriwulan,
} from '../../../redux/master/masterSlice';
import { getPrograms } from '../../../api/admin/program';
import getTriwulan from '../../../api/static/getTriwulan';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation } from 'react-query';
import DropdownDialog from '../../../components/DropdownDialog';

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

export default function MasterCreate() {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedTriwulan, setSelectedTriwulan] = useState(null);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  const [occassions, setOccassions] = useState(initialOccassions);

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('created_at', formattedDate(Date.now()));
  }, []);

  const removeOccasionComponent = (indexToRemove) => {
    const newOccasions = occassions.filter(
      (_, index) => index !== indexToRemove
    );
    setOccassions(newOccasions);
  };

  const handleSelectTriwulan = (item) => {
    setSelectedTriwulan(item);
  };

  const handleSelectOpd = (item) => {
    setSelectedOpd(item);
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
  };

  const addOccasionComponent = () => {
    setOccassions([
      ...occassions,
      {
        selected: null,
      },
    ]);
  };

  const createMutation = useMutation(createMaster);

  const onSubmit = () => {
    if (!selectedTriwulan || !selectedOpd || !selectedPurpose) {
      showToastMessage('Pastikan semua data terisi', 'error');
      return;
    }

    for (let index = 0; index < occassions.length; index += 1) {
      if (occassions[index].selected === null) {
        showToastMessage('Pastikan semua data terisi', 'error');
        return;
      }
    }

    createMutation.mutate(
      {
        body: {
          triwulan_id: selectedTriwulan.id,
          organization_id: selectedOpd.id,
          purpose_id: selectedPurpose.id,
          occassions: occassions.map((ocs) => Number(ocs.selected.id)),
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Data Master');
          navigate('/laporan');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Master</h1>
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
          {errors.occasion && (
            <p className="mt-2 text-xs text-red-600">{errors.occasion}</p>
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
            />
          </div>

          {false ? (
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
}
