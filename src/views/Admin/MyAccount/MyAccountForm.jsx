import { PencilIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import login from '../../../api/auth/login';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';
import MyAccountEdit from './MyAccountEdit';

export default function MyAccountForm() {
  const auth = useAuthUser();
  const [account, setAccount] = useState({
    username: auth().username,
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const { showToastMessage } = useToastContext();

  const onSubmit = async (event) => {
    event.preventDefault();

    setPasswordError('');

    if (!account.password) {
      setPasswordError('Password harus diisi');
      return;
    }

    setLoading(true);

    try {
      const loginBody = {
        username: account.username,
        password: account.password,
      };
      await login(loginBody);
      setLoading(false);
      setAuthenticated(true);
    } catch (error) {
      setPasswordError(error.message);
      showToastMessage(error.message, 'error');
    }

    setLoading(false);
  };

  const handleOnChange = (event) => {
    setAccount((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  };

  if (authenticated) {
    return <MyAccountEdit onBack={() => setAuthenticated(false)} />;
  }

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <div className="mb-6">
        <Label htmlFor="username">Username</Label>
        <TextInput
          disabled
          className="mt-2 lg:w-2/3 xl:w-1/3"
          placeholder="Masukan Username"
          value={account.username}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput
          className="mt-2 lg:w-2/3 xl:w-1/3"
          type="password"
          placeholder="Masukan Password"
          value={account.password}
          error={passwordError}
          onChange={handleOnChange}
        />
      </div>
      {loading ? (
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
}
