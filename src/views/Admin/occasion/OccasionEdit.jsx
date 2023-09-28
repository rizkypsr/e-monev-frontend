import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Label } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import { updateOccasion } from '../../../api/admin/occasion';
import ErrorPage from '../../ErrorPage';
import ReactLoading from '../../../components/Loading';
import getOccassion from '../../../api/admin/occasion/getOccasionDetail';

function OccasionEdit() {
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_occassion'],
    queryFn: () => getOccassion(id, authHeader()),
    onSuccess: (result) => {
      setValue('title', result.data.title);
    },
  });

  const updateMutation = useMutation(updateOccasion);

  const onSubmit = (formData) => {
    updateMutation.mutate(
      {
        body: {
          ...formData,
          occassion_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Urusan');
          navigate('/admin/urusan');
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
        <h1 className="text-2xl font-semibold">Urusan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Urusan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              id="title"
              name="title"
              placeholder="Urusan"
              register={register('title', {
                required: 'Urusan wajib diisi!',
              })}
              error={errors.title?.message}
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
}

export default OccasionEdit;
