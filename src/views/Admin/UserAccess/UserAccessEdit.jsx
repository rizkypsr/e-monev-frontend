import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import ErrorPage from '../../ErrorPage';
import { getOrganizations } from '../../../api/admin/organization';
import { useToastContext } from '../../../context/ToastContext';
import updateUser from '../../../api/auth/updateUser';
import ReactLoading from '../../../components/Loading';
import { getUser } from '../../../api/admin/user';
import DropdownDialog from '../../../components/DropdownDialog';
import getRoles from '../../../api/static/getRoles';

let initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const UserAccessEdit = () => {
  const { id } = useParams();

  const [selectedOpd, setSelectedOpd] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const userQuery = useQuery({
    queryKey: ['get_user'],
    queryFn: () => getUser(id, authHeader()),
    onSuccess: (data) => {
      setValue('name', data.data.name);
      setValue('username', data.data.username);
      setValue('opd', data.data.organization_id);
      setValue('level', data.data.role_id);

      setSelectedLevel(data.data.role);
      setSelectedOpd(data.data.organization);
    },
  });

  const opdQuery = useInfiniteQuery({
    queryKey: ['get_organizations'],
    queryFn: async ({ pageParam = 1 }) => {
      initialParams = {
        ...initialParams,
        page: pageParam,
      };

      return getOrganizations(initialParams, authHeader());
    },
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const rolesQuery = useInfiniteQuery({
    queryKey: ['get_roles'],
    queryFn: () => getRoles(authHeader()),
  });

  const updateMutation = useMutation(updateUser);

  const onSubmit = (formData) => {
    const { name, username, password, level } = formData;

    const requestBody = {
      body: {
        name,
        username,
        password,
        user_id: id,
        admin_role_id: level,
      },
      token: authHeader(),
    };

    updateMutation.mutate(requestBody, {
      onSuccess: () => {
        showToastMessage('Berhasil mengubah akun');
        navigate('/admin/login-akses-user');
      },
      onError: (error) => {
        showToastMessage(error.message, 'error');
      },
    });
  };

  const handleSelectOpd = (item) => {
    setSelectedOpd(item);
    setValue('opd', item.id);
  };

  const handleSelectLevel = (item) => {
    setSelectedLevel(item);
    setValue('level', item.id);
  };

  if (userQuery.isError) {
    return <ErrorPage errorMessage={userQuery.error.message} />;
  }

  if (userQuery.isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit User
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label className="mb-2">OPD</Label>
            <DropdownDialog
              label="Pilih OPD"
              data={opdQuery.data}
              value={selectedOpd}
              onChange={handleSelectOpd}
              register={register('opd', {
                required: 'OPD wajib diisi!',
              })}
              error={errors.opd?.message}
            />
          </div>

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
            <Label htmlFor="username">Nama</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Masukan Nama"
              register={register('name', {
                required: 'Nama wajib diisi!',
              })}
              error={errors.name?.message}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="username">Username</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Masukan Nama"
              register={register('username', {
                required: 'Nama wajib diisi!',
              })}
              error={errors.username?.message}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder="Masukan Password"
              register={register('password', {
                required:
                  'Password wajib diisi! Masukan password lama jika tidak ingin mengubah',
              })}
              error={errors.password?.message}
            />
          </div>
          {updateMutation.isLoading ? (
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

export default UserAccessEdit;
