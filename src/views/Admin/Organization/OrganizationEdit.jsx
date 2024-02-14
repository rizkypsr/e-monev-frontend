import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import ErrorPage from '../../ErrorPage';
import Label from '../../../components/Label';
import {
  getOrganization,
  updateOrganization,
} from '../../../api/admin/organization';
import ReactLoading from '../../../components/Loading';

const OrganizationEdit = () => {
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
    queryKey: ['get_organization'],
    queryFn: () => getOrganization(id, authHeader()),
    onSuccess: (result) => {
      setValue('title', result.data.title);
    },
  });

  const updateMutation = useMutation(updateOrganization);

  const onSubmit = (formData) => {
    updateMutation.mutate(
      {
        body: {
          ...formData,
          organization_id: id,
        },
        token: authHeader(),
      },
      {
        onSuccess: () => {
          showToastMessage('Berhasil membuat Organisasi');
          navigate('/organisasi');
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
        <h1 className="text-2xl font-semibold">Organisasi</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Organisasi
          </h1>
        </Link>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label className="mb-2">Organisasi</Label>
            <TextInput
              id="title"
              name="title"
              placeholder="Organisasi"
              register={register('title', {
                required: 'Organisasi wajib diisi!',
                maxLength: {
                  message: 'Nama Organisasi maksimal 150 karater',
                  value: 150,
                },
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

export default OrganizationEdit;
