import PropTypes from 'prop-types';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import updateUser from '../../../api/auth/updateUser';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

export default function MyAccountEdit({ onBack }) {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');
  const [loading, setLoading] = useState(false);

  const authUser = useAuthUser();
  const signOut = useSignOut();
  const { showToastMessage } = useToastContext();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!account.username && !account.password) {
      showToastMessage('Anda tidak merubah apapun!', 'error');
      return;
    }

    if (account.password !== account.passwordConfirmation) {
      setPasswordConfirmationError('Pastikan Password yang anda masukan sama');
      return;
    }

    setLoading(true);

    const requestBody = {
      user_id: authUser().id,
      ...(account.username && { username: account.username }),
      ...(account.password && { password: account.password }),
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

  const handleOnChange = (event) => {
    event.preventDefault();

    setAccount({
      ...account,
      [event.target.name]: event.target.value,
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
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="mb-6">
          <Label>Username Baru</Label>
          <TextInput
            name="username"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Username Baru"
            value={account.username}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <TextInput
            name="password"
            type="password"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Password"
            value={account.password}
            error={passwordConfirmationError}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-6">
          <Label>Ulangi Password</Label>
          <TextInput
            name="passwordConfirmation"
            type="password"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Ulang Password"
            value={account.passwordConfirmation}
            error={passwordConfirmationError}
            onChange={handleOnChange}
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
}

MyAccountEdit.propTypes = {
  onBack: PropTypes.func.isRequired,
};
