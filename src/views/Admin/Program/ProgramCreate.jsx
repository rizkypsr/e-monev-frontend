import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import { createProgram } from '../../../api/admin/program';
import ReactLoading from '../../../components/Loading';
import Label from '../../../components/Label';
import DropdownDialog from '../../../components/DropdownDialog';
import { getOccasions } from '../../../api/admin/occasion';

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const ProgramCreate = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedOccassion, setSelectedOccassion] = useState(null);

  const occassionQuery = useInfiniteQuery({
    queryKey: ['get_occassions'],
    queryFn: async ({ pageParam = 1 }) =>
      getOccasions(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const createMutation = useMutation(createProgram);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const { title, occassion } = formData;

    createMutation.mutate(
      {
        body: {
          title,
          occassion_id: occassion,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Program');
          navigate('/program');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  const handleSelectOccassion = (occassion) => {
    setSelectedOccassion(occassion);
    setValue('occassion', occassion.id);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Program
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label className="mb-2">Program</Label>
            <TextInput
              placeholder="Masukan Program"
              register={register('title', {
                required: 'Nama Program wajib diisi!',
              })}
              error={errors.title?.message}
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2">Urusan</Label>
            <DropdownDialog
              label="Pilih Urusan"
              data={occassionQuery.data}
              value={selectedOccassion}
              onChange={handleSelectOccassion}
              register={register('occassion', {
                required: 'Urusan wajib diisi!',
              })}
              error={errors.occassion?.message}
            />
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
    </>
  );
};

export default ProgramCreate;
