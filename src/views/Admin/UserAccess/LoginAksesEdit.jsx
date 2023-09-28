import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { animated, useTransition } from '@react-spring/web';
import InfiniteScroll from 'react-infinite-scroll-component';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import SelectInputModal from '../../../components/SelectInputModal';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '../../../components/DialogContent';
import List from '../../../components/List';
import ErrorPage from '../../ErrorPage';
import {
  createOrganization,
  getOrganizations,
} from '../../../api/admin/organization';
import { useToastContext } from '../../../context/ToastContext';
import updateUser from '../../../api/auth/updateUser';
import ReactLoading from '../../../components/Loading';
import { getUser } from '../../../api/admin/user';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import DropdownDialog from '../../../components/DropdownDialog';
import getRoles from '../../../api/static/getRoles';

let initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

function LoginAksesEdit() {
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
      setSelectedLevel(data.data.role);
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

  const onSubmit = (data) => {
    const requestBody = {
      body: {
        user_id: id,
        ...data,
        admin_role_id: selectedLevel.id,
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
  };

  const handleSelectLevel = (item) => {
    setSelectedLevel(item);
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
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2">Level</Label>
            <DropdownDialog
              label="Pilih Level User"
              data={rolesQuery.data}
              value={selectedLevel}
              onChange={handleSelectLevel}
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
                required: 'Password wajib diisi!',
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
}

export default LoginAksesEdit;
