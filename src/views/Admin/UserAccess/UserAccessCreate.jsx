import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';

import { getOrganizations } from '../../../api/admin/organization';
import getRoles from '../../../api/static/getRoles';
import createUser from '../../../api/admin/user/createUser';

import Label from '../../../components/Label';
import Button from '../../../components/Button';
import TextInputV2 from '../../../components/TextInputV2';
import ReactLoading from '../../../components/Loading';
import DropdownDialog from '../../../components/DropdownDialog';

import { useToastContext } from '../../../context/ToastContext';

const initialParams = {
  limit: 20,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const initialOrganizations = [
  {
    selected: null,
  },
];

const UserAccessCreate = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [filterParams, setFilterParams] = useState(initialParams);
  const [opdError, setOpdError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const opdQuery = useInfiniteQuery({
    queryKey: ['get_organizations'],
    queryFn: async ({ pageParam = 1 }) => {
      const params = filterParams;

      params.page = pageParam;

      const res = await getOrganizations(params, authHeader());

      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }

      return undefined;
    },
  });

  const rolesQuery = useInfiniteQuery({
    queryKey: ['get_roles'],
    queryFn: () => getRoles(authHeader()),
  });

  const handleOpdOnBottom = () => {
    opdQuery.fetchNextPage();
  };

  const createMutation = useMutation(createUser);

  const onSubmit = (formData) => {
    const { name, username, email, password, level } = formData;

    const emptyOpd = organizations.filter((opd) => opd.selected === null);

    // If organizations is not selected
    if (emptyOpd.length > 0) {
      setOpdError('Semua OPD wajib dipilih');
      return;
    }

    createMutation.mutate(
      {
        body: {
          name,
          username,
          email,
          password,
          organization_id: organizations.map((opd) => opd.selected.id),
          admin_role_id: level,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat akun');
          navigate('/login-akses-user');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  const addOrganizationsComponent = () => {
    setOrganizations([
      ...organizations,
      {
        selected: null,
      },
    ]);
  };

  const removeOrganizationsComponent = (indexToRemove) => {
    const newOrganizations = organizations.filter(
      (_, index) => index !== indexToRemove
    );
    setOrganizations(newOrganizations);
  };

  const handleSelectOpd = (item, index) => {
    setOrganizations((prev) => {
      const updatedOpd = [...prev];
      updatedOpd[index] = { selected: item };
      return updatedOpd;
    });
  };

  const handleSelectLevel = (item) => {
    if (item.name !== 'Admin Bidang') {
      setOrganizations(initialOrganizations);
    }

    setSelectedLevel(item);
    setValue('level', item.id);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah User
          </h1>
        </Link>

        <form
          className="mt-4 lg:w-2/3 xl:w-2/6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <Label className="mb-2">OPD</Label>
            <div className="space-y-3">
              {organizations.map((opd, index) => (
                <DropdownDialog
                  label="Pilih OPD"
                  data={opdQuery.data}
                  value={opd.selected}
                  onChange={(value) => handleSelectOpd(value, index)}
                  onDelete={
                    index > 0 && (() => removeOrganizationsComponent(index))
                  }
                  fetchNextPage={opdQuery.fetchNextPage}
                  hasNextPage={opdQuery.hasNextPage}
                  isFetchingNextPage={opdQuery.isFetchingNextPage}
                  onBottom={() => handleOpdOnBottom()}
                />
              ))}
            </div>
            {opdError && (
              <p className="mt-2 text-xs text-red-600">{opdError}</p>
            )}
          </div>
          {errors.organization && (
            <p className="mt-2 text-xs text-red-600">{errors.organization}</p>
          )}
          {selectedLevel?.name === 'Admin Bidang' && (
            <div className="mb-6">
              <Button
                onClick={addOrganizationsComponent}
                textColor="text-[#2F80ED]"
                icon={<PlusCircleIcon className="w-8 h-8" />}
              >
                Tambah OPD Lain
              </Button>
            </div>
          )}
          <div className="mb-6">
            <Label className="mb-2">Level</Label>
            <DropdownDialog
              label="Pilih Level User"
              data={rolesQuery.data}
              value={selectedLevel}
              onChange={handleSelectLevel}
              register={register('level', {
                required: 'Level wajib diisi!',
              })}
              error={errors.level?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Nama</Label>
            <TextInputV2
              placeholder="Masukan Nama"
              register={register('name', {
                required: 'Nama wajib diisi!',
              })}
              error={errors.name?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Username</Label>
            <TextInputV2
              placeholder="Masukan Username"
              register={register('username', {
                required: 'Nama wajib diisi!',
              })}
              error={errors.username?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Email</Label>
            <TextInputV2
              placeholder="Masukan Email"
              register={register('email', {
                required: 'Email wajib diisi!',
              })}
              error={errors.email?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Password</Label>
            <TextInputV2
              placeholder="Masukan Password"
              register={register('password', {
                required: 'Password wajib diisi!',
              })}
              error={errors.password?.message}
            />
          </div>

          {createMutation.isLoading ? (
            <ReactLoading />
          ) : (
            <div className="flex space-x-3">
              <Button
                className="w-full md:w-28"
                background="bg-primary"
                textColor="text-white"
                type="submit"
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

export default UserAccessCreate;
