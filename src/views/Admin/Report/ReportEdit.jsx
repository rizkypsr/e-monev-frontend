import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import Label from '../../../components/Label';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import ErrorPage from '../../ErrorPage';
import ReactLoading from '../../../components/Loading';
import { getReport } from '../../../api/admin/report';
import { getOccasions } from '../../../api/admin/occasion';
import { getOrganizations } from '../../../api/admin/organization';
import { getPrograms } from '../../../api/admin/program';
import updateReport from '../../../api/admin/report/updateReport';
import getTriwulan from '../../../api/static/getTriwulan';
import DropdownDialog from '../../../components/DropdownDialog';

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const ReportEdit = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [selectedTriwulan, setSelectedTriwulan] = useState(null);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [selectedOccassion, setSelectedOccassion] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_report'],
    queryFn: () => getReport(id, authHeader()),
    onSuccess: (result) => {
      setSelectedTriwulan(result.data.result.triwulan);
      setSelectedOpd(result.data.result.organization);
      setSelectedOccassion(result.data.result.occassion);
      setSelectedProgram(result.data.result.program);

      setValue('triwulan_id', result.data.result.triwulan.id);
      setValue('organization_id', result.data.result.organization.id);
      setValue('occassion_id', result.data.result.occassion.id);
      setValue('program_id', result.data.result.program.id);
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
      getOrganizations(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const occassionQuery = useInfiniteQuery({
    queryKey: ['get_occassions'],
    queryFn: ({ pageParam = 1 }) => getOccasions(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const programQuery = useInfiniteQuery({
    queryKey: ['get_programs'],
    queryFn: ({ pageParam = 1 }) => getPrograms(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const updateMutation = useMutation(updateReport);

  const handleSelectTriwulan = (item) => {
    setSelectedTriwulan(item);
    setValue('triwulan_id', item.id);
  };

  const handleSelectOccassion = (item) => {
    setSelectedOccassion(item);
    setValue('occassion_id', item.id);
  };

  const handleSelectOpd = (item) => {
    setSelectedOpd(item);
    setValue('organization_id', item.id);
  };

  const handleSelectProgram = (item) => {
    setSelectedProgram(item);
    setValue('program_id', item.id);
  };

  const onSubmit = (formData) => {
    updateMutation.mutate(
      {
        body: {
          ...formData,
          data_report_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil mengubah Laporan');
          navigate('/admin/laporan');
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Data Laporan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Laporan
          </h1>
        </Link>

        <form
          className="mt-4 lg:w-2/3 xl:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <Label className="mb-2">Triwulan</Label>
            <DropdownDialog
              label="Pilih Triwulan"
              data={triwulanQuery.data}
              value={selectedTriwulan}
              onChange={handleSelectTriwulan}
              register={register('triwulan_id', {
                required: 'Triwulan wajib dipilih!',
                valueAsNumber: true,
              })}
              error={errors.triwulan_id?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Urusan</Label>
            <DropdownDialog
              label="Pilih Urusan"
              data={occassionQuery.data}
              value={selectedOccassion}
              onChange={handleSelectOccassion}
              register={register('occassion_id', {
                required: 'Urusan wajib dipilih!',
                valueAsNumber: true,
              })}
              error={errors.occassion_id?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Organisasi</Label>
            <DropdownDialog
              label="Pilih Organisasi"
              data={opdQuery.data}
              value={selectedOpd}
              onChange={handleSelectOpd}
              register={register('organization_id', {
                required: 'Organisasi wajib dipilih!',
                valueAsNumber: true,
              })}
              error={errors.organization_id?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Program</Label>
            <DropdownDialog
              label="Pilih Program"
              data={programQuery.data}
              value={selectedProgram}
              onChange={handleSelectProgram}
              register={register('program_id', {
                required: 'Program wajib dipilih!',
                valueAsNumber: true,
              })}
              error={errors.program_id?.message}
            />
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

export default ReportEdit;
