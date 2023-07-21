import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { useTransition } from '@react-spring/web';
import uuid from 'react-uuid';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import SelectInputModal from '../../../components/SelectInputModal';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '../../../components/DialogContent';
import List from '../../../components/List';
import {
  createOrganization,
  getOrganizations,
} from '../../../api/admin/organization';
import register from '../../../api/auth/register';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';
import DialogInputWrapper from '../../../components/DialogInputWrapper';

function LoginAksesCreate() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newOpd, setNewOpd] = useState('');
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [openOpd, setOpenOpd] = useState(false);
  const [openCreateOpd, setOpenCreateOpd] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openLevel, setOpenLevel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [opdData, setOpdData] = useState([
    {
      id: uuid(),
    },
  ]);
  const [levelData, setLevelData] = useState([]);
  const [opdError, setOpdError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const transition = useTransition(openCreateOpd, {
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

  const fetchLevel = async () => {
    setLevelData([
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'User OPD' },
      { id: 3, name: 'Admin Bidang' },
    ]);
  };

  useEffect(() => {
    fetchLevel();
  }, []);

  useEffect(() => {
    if (selectedLevel != null && selectedLevel.id !== 3) {
      setOpdData([
        {
          id: uuid(),
        },
      ]);
    }
  }, [selectedLevel]);

  const removeOpdComponent = (indexToRemove) => {
    const newOrganization = opdData.filter(
      (_, index) => index !== indexToRemove
    );
    setOpdData(newOrganization);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!selectedOpd) {
      errors.opd = 'Nama OPD harus dipilih';
    }

    if (!selectedLevel) {
      errors.level = 'Level user harus dipilih';
    }

    if (!name) {
      errors.name = 'Nama harus diisi';
    }

    if (!username) {
      errors.username = 'Username harus diisi';
    }

    if (!password) {
      errors.password = 'Password harus diisi';
    }

    if (Object.keys(errors).length > 0) {
      setOpdError(errors.opd || '');
      setLevelError(errors.level || '');
      setNameError(errors.name || '');
      setUsernameError(errors.username || '');
      setPasswordError(errors.password || '');
      return;
    }

    setIsLoading(true);

    try {
      const userBody = {
        username,
        password,
        name,
        admin_role_id: selectedLevel.id,
        organization_id: selectedOpd.id,
      };
      const userResponse = await register(userBody);

      setIsLoading(false);
      showToastMessage(userResponse.message);
      navigate('../');
    } catch (error) {
      setIsLoading(false);
      showToastMessage(error.message, 'error');
    }
  };

  const handleSelectOpd = (item) => {
    const newOrganizations = [...opdData];
    const updatedValue = newOrganizations.map((ocs) => {
      if (ocs.id === item.id) {
        return item.value;
      }
      return ocs;
    });

    setOpdData(updatedValue);
  };

  const addOpdComponent = () => {
    const id = uuid();
    setOpdData([...opdData, { id }]);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setOpenLevel(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setOpdData((prev) => ({
        ...prev,
        isLoading: true,
      }));
      setOpenCreateOpd(false);

      try {
        const organizationBody = { title: newOpd };
        const organizationResponse = await createOrganization(
          authHeader,
          organizationBody
        );

        setOpdData((prev) => ({
          ...prev,
          isLoading: false,
          items: [
            {
              id: organizationResponse.data.id,
              title: organizationResponse.data.title,
            },
            ...prev.items,
          ],
        }));

        showToastMessage(organizationResponse);
      } catch (err) {
        setOpdData((prev) => ({
          ...prev,
          isLoading: false,
        }));
        showToastMessage(err.message, 'error');
      }
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah User
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label className="mb-2">Urusan</Label>
            <div className="space-y-3 lg:w-2/3 xl:w-1/3">
              {opdData.map((ocs, index) => (
                <DialogInputWrapper
                  trailingIcon={index > 0}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  label="Urusan"
                  selectedItem={ocs.title}
                  onFetching={getOrganizations}
                  onSelect={(value) => handleSelectOpd({ id: ocs.id, value })}
                  onDelete={() => removeOpdComponent(index)}
                />
              ))}
            </div>
          </div>
          {selectedLevel != null && selectedLevel.id === 3 && (
            <div className="mb-6">
              <Button
                className="px-0"
                onClick={addOpdComponent}
                textColor="text-[#2F80ED]"
                icon={<PlusCircleIcon className="w-8 h-8" />}
              >
                Tambah OPD Lain
              </Button>
            </div>
          )}
          <div className="mb-6">
            <Label>Level User</Label>
            <Dialog open={openLevel} onOpenChange={setOpenLevel}>
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedLevel && selectedLevel.name}
                  label="--- Pilih Level User ---"
                  error={levelError}
                />
              </DialogTrigger>

              <DialogContent title="Pilih Level User">
                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>

                <List data={levelData} onSelectValue={handleSelectLevel} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label htmlFor="username">Nama</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama"
              value={name}
              error={nameError}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="username">Username</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Username"
              value={username}
              error={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              type="password"
              placeholder="Masukan Password"
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading ? (
            <ReactLoading />
          ) : (
            <div className="flex space-x-3">
              <Button
                className="w-full md:w-28"
                background="bg-primary"
                textColor="text-white"
                type="submit"
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

export default LoginAksesCreate;
