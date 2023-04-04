import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import updateUser from '../../../api/auth/updateUser';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

export default function MyAccountEdit() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const authUser = useAuthUser();
  const signOut = useSignOut();
  const { showToastMessage } = useToastContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (password !== passwordConfirmation) {
      setPasswordError('Pastikan Password yang anda masukan sama');
      setLoading(false);
      return;
    }

    const requestBody = {
      user_id: authUser().id,
      ...(username && { username }),
      ...(password && { password }),
    };

    try {
      const userResponse = await updateUser(requestBody);
      showToastMessage(userResponse.message);
      signOut();
    } catch (error) {
      showToastMessage(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="../" className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Ubah akun saya
        </h1>
      </Link>
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="mb-6">
          <Label>Username Baru</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Username Baru"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            type="password"
            disableIcon={false}
            placeholder="Masukan Password"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        <div className="mb-6">
          <Label>Ulangi Password</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            type="password"
            disableIcon={false}
            placeholder="Masukan Ulang Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={passwordError}
          />
        </div>

        {loading ? (
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
    </>
  );
}
