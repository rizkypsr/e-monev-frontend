import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useAuthHeader, useAuthUser, useSignOut } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import updateUser from '../../../api/auth/updateUser';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

const MyAccountEdit = ({ onBack }) => {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const { showToastMessage } = useToastContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateMutation = useMutation(updateUser);

  const onSubmit = (data) => {
    const { username, password } = data;

    if (!username && !password) {
      showToastMessage('Anda tidak merubah apapun!', 'error');
      return;
    }

    const requestBody = {
      body: {
        user_id: authUser().user_id,
        username,
        password,
      },
      token: authHeader(),
    };

    requestBody.body = Object.fromEntries(
      Object.entries(requestBody.body).filter(([_, value]) => value !== '')
    );

    updateMutation.mutate(requestBody, {
      onSuccess: (res) => {
        if (res.statusCode === 200) {
          showToastMessage('Berhasil mengubah akun');
          signOut();
        }
      },
      onError: (error) => {
        showToastMessage(
          `Terjadi kesalahan saat login: ${error.message}`,
          'error'
        );
      },
    });
  };

  return (
    <>
      <button
        type="button"
        className="flex space-x-3 items-center mb-8"
        onClick={() => onBack()}
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Ubah akun saya
        </h1>
      </button>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Label>Username Baru</Label>
          <TextInput
            name="username"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Username Baru"
            register={register('username', {
              required: false,
            })}
            error={errors.username?.message}
          />
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <TextInput
            name="password"
            type="password"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Password"
            register={register('password', {
              required: false,
            })}
            error={errors.password?.message}
          />
        </div>
        <div className="mb-6">
          <Label>Ulangi Password</Label>
          <TextInput
            name="passwordConfirmation"
            type="password"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Ulang Password"
            register={register('passwordConfirmation', {
              required: false,
              validate: {
                match: (val) => watch('password') === val,
              },
            })}
            error={
              errors.passwordConfirmation?.type === 'match' &&
              'Password tidak sama!'
            }
          />
        </div>

        {updateMutation.isLoading ? (
          <ReactLoading />
        ) : (
          <div className="flex space-x-3">
            <Button
              className="w-full md:w-28"
              type="submit"
              background="bg-primary"
              textColor="text-white"
              icon={<CheckCircleIcon className="w-5 h-5" />}
            >
              Simpan
            </Button>
            <Button
              className="w-full md:w-28 font-medium"
              background="bg-[#EAEAEA]"
              textColor="text-dark-gray"
              onClick={() => onBack()}
            >
              Batal
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default MyAccountEdit;
