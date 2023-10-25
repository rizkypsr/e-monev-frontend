import {
  ArrowLeftIcon,
  CheckCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import { useForm } from 'react-hook-form';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
} from '../../../api/admin/activity';
import { getPrograms } from '../../../api/admin/program';
import Button from '../../../components/Button';

import Label from '../../../components/Label';
import ReactLoading from '../../../components/Loading';
import TextInput from '../../../components/TextInput';
import { useToastContext } from '../../../context/ToastContext';
import ErrorPage from '../../ErrorPage';
import DropdownDialog from '../../../components/DropdownDialog';

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
};

const ActivityEdit = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();
  const queryClient = useQueryClient();

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openCreateActivity, setOpenCreateActivity] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const activityQuery = useQuery({
    queryKey: ['get_activity'],
    queryFn: () => getActivity(id, authHeader()),
    onSuccess: (data) => {
      setValue('subActivity', data.data.sub_activity);
      setValue('program', data.data.program_id);

      setSelectedProgram(data.data.program);
    },
  });

  const activitiesQuery = useInfiniteQuery({
    queryKey: ['get_activities'],
    queryFn: async ({ pageParam = 1 }) =>
      getActivities(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const programsQuery = useInfiniteQuery({
    queryKey: ['get_programs'],
    queryFn: async ({ pageParam = 1 }) =>
      getPrograms(initialParams, authHeader()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  });

  const transition = useTransition(openCreateActivity, {
    config: {
      duration: 120,
    },
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

  const openCreateActivityClick = () => {
    setOpenCreateActivity(!openCreateActivity);
  };

  const handleSelectActivity = (item) => {
    setSelectedActivity(item);
    setValue('activity', item.title);
  };

  const handleSelectProgram = (item) => {
    setSelectedProgram(item);
    setValue('program', item.id);
  };

  const createMutation = useMutation(createActivity);
  const updateMutation = useMutation(updateActivity);

  const onSubmit = (formData) => {
    const { activity, subActivity, program } = formData;

    updateMutation.mutate(
      {
        body: {
          title: activity,
          sub_activity: subActivity,
          program_id: program,
          activity_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat kegiatan');
          navigate('/kegiatan');
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  const onSubmit2 = (formData) => {
    const { activity2 } = formData;

    createMutation.mutate(
      {
        body: {
          title: activity2,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('get_activities');
          showToastMessage('Berhasil membuat kegiatan');
          setOpenCreateActivity(false);
        },
        onError: (error) => {
          showToastMessage(error.message, 'error');
        },
      }
    );
  };

  if (activityQuery.isError) {
    return <ErrorPage errorMessage={activityQuery.error.message} />;
  }

  if (activityQuery.isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Kegiatan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Kegiatan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label className="mb-2">Nama Kegiatan</Label>
            <DropdownDialog
              label="Pilih Kegiatan"
              data={activitiesQuery.data}
              value={selectedActivity}
              onChange={handleSelectActivity}
              register={register('activity', {
                required: 'Kegiatan wajib dipilih!',
              })}
              error={errors.activity?.message}
            >
              <Button
                type="button"
                background="bg-primary"
                textColor="text-white"
                icon={<PlusIcon className="w-4 h-4" />}
                onClick={() => openCreateActivityClick()}
              />

              {transition((style, isOpen) => (
                <div>
                  {isOpen && (
                    <animated.div
                      style={style}
                      className="w-72 bg-white absolute z-auto rounded-md p-4 -right-80 top-0"
                    >
                      <form onSubmit={handleSubmit2(onSubmit2)}>
                        <TextInput
                          required
                          placeholder="Masukan Nama Kegiatan"
                          register={register2('activity2', {
                            required: 'Nama Kegiatan wajib diisi!',
                          })}
                          error={errors2.activity2?.message}
                        />
                        <p className="text-xs text-light-gray mt-2 text-left">
                          Tekan{' '}
                          <span className="itelic text-dark-gray">Enter</span>{' '}
                          untuk menyimpan
                        </p>
                      </form>
                    </animated.div>
                  )}
                </div>
              ))}
            </DropdownDialog>
          </div>
          <div className="mb-6">
            <Label className="mb-2">Nama Sub Bagian</Label>
            <TextInput
              placeholder="Masukan Nama Sub Kegiatan"
              register={register('subActivity', {
                required: 'Sub Kegiatan wajib diisi!',
              })}
              error={errors.subActivity?.message}
            />
          </div>
          <div className="mb-6">
            <Label className="mb-2">Program</Label>
            <DropdownDialog
              label="Pilih Program"
              data={programsQuery.data}
              value={selectedProgram}
              onChange={handleSelectProgram}
              register={register('program', {
                required: 'Program wajib dipilih!',
              })}
              error={errors.program?.message}
            />
          </div>
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
        </form>
      </div>
    </>
  );
};

export default ActivityEdit;
