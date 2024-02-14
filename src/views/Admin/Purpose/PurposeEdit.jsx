import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import getPurpose from '../../../api/admin/purpose/getPurpose';
import ErrorPage from '../../ErrorPage';
import updatePurpose from '../../../api/admin/purpose/updatePurpose';
import ReactLoading from '../../../components/Loading';

const PurposeEdit = () => {
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
    queryKey: ['get_purpose'],
    queryFn: () => getPurpose(id, authHeader()),
    onSuccess: (result) => {
      setValue('title', result.data.title);
    },
  });

  const updateMutation = useMutation(updatePurpose);

  const onSubmit = (formData) => {
    updateMutation.mutate(
      {
        body: {
          ...formData,
          purpose_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil mengubah Sasaran');
          navigate('/sasaran');
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
        <h1 className="text-2xl font-semibold">Sasaran</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Sasaran
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label className="mb-2">Indikator Program</Label>
            <TextInput
              placeholder="Masukan Indikator Program"
              register={register('title', {
                required: 'Indikator Program wajib diisi!',
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

export default PurposeEdit;
