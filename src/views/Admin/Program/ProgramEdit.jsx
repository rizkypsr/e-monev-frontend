import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Label } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { getProgram, updateProgram } from '../../../api/admin/program';
import ErrorPage from '../../ErrorPage';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

const ProgramEdit = () => {
  const { id } = useParams();
  const { showToastMessage } = useToastContext();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_program'],
    queryFn: () => getProgram(id, authHeader()),
    onSuccess: (result) => {
      setValue('title', result.data.title);
    },
  });

  const updateMutation = useMutation(updateProgram);

  const onSubmit = (formData) => {
    updateMutation.mutate(
      {
        body: {
          ...formData,
          program_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil mengubah Program');
          navigate('/admin/program');
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
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Program
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

export default ProgramEdit;
