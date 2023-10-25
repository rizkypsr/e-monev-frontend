import { PencilIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import login from '../../../api/auth/login';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';
import MyAccountEdit from './MyAccountEdit';

const MyAccountForm = () => {
  const auth = useAuthUser();

  const [authenticated, setAuthenticated] = useState(false);

  const { showToastMessage } = useToastContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const loginMutation = useMutation(login);

  useEffect(() => {
    setValue('username', auth().username);
  }, [auth, setValue]);

  const onSubmit = (data) => {
    const { username, password } = data;

    loginMutation.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: (res) => {
          if (res.statusCode === 200) {
            setAuthenticated(true);
          }
        },
        onError: (error) => {
          showToastMessage(
            `Terjadi kesalahan saat login: ${error.message}`,
            'error'
          );
        },
      }
    );
  };

  if (authenticated) {
    return (
      <MyAccountEdit
        onBack={() => {
          setAuthenticated(false);
        }}
      />
    );
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Label htmlFor="username">Username</Label>
        <TextInput
          placeholder="Masukan Username"
          register={register('username', {
            disabled: true,
          })}
          disabled
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput
          type="password"
          placeholder="Masukan Password"
          register={register('password', {
            required: 'Password wajib diisi!',
          })}
          error={errors.password?.message}
        />
      </div>
      {loginMutation.isLoading ? (
        <ReactLoading />
      ) : (
        <Button
          type="submit"
          className="w-full md:w-28"
          background="bg-primary"
          textColor="text-white"
          icon={<PencilIcon className="w-4 h-4" />}
        >
          Edit
        </Button>
      )}
    </form>
  );
};

export default MyAccountForm;
