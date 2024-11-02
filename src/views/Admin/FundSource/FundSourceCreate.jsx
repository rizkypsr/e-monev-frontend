import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import ReactLoading from '../../../components/Loading';
import { useToastContext } from '../../../context/ToastContext';
import createFundSource from '../../../api/admin/fundSource/createFundSource';

const FundSourceCreate = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createMutation = useMutation(createFundSource);

  const onSubmit = (formData) => {
    const { name, fund_source_total } = formData;

    createMutation.mutate(
      {
        body: {
          name,
          fund_source_total,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat sumber dana');
          navigate('/sumber-dana');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sumber Dana</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Sumber Dana
          </h1>
        </Link>

        <form id="mainForm" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label>Nama</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Nama"
              register={register('name', {
                required: 'Nama wajib diisi!',
              })}
              error={errors.name?.message}
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2">Total Sumber Dana</Label>
            <TextInput
              type="number"
              placeholder="Masukan Total Sumber Dana"
              register={register('fund_source_total', {
                required: 'Total Sumber Dana wajib diisi!',
                valueAsNumber: true,
                max: {
                  message: 'Maksimal Rp.200.000.000.000.000',
                  value: 200000000000000000,
                },
              })}
              error={errors.fund_source_total?.message}
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

export default FundSourceCreate;
