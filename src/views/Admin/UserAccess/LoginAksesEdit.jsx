import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { animated, useTransition } from '@react-spring/web';
import InfiniteScroll from 'react-infinite-scroll-component';
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
import ErrorPage from '../../ErrorPage';
import {
  createOrganization,
  getOrganizations,
} from '../../../api/admin/organization';
import { useToastContext } from '../../../context/ToastContext';
import updateUser from '../../../api/auth/updateUser';
import ReactLoading from '../../../components/Loading';
import { getUser } from '../../../api/admin/user';

function LoginAksesEdit() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [openOpdDialog, setOpenOpdDialog] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openLevelUserDialog, setOpenLevelUserDialog] = useState(false);
  const [openCreateOpd, setOpenCreateOpd] = useState(false);

  const [opdData, setOpdData] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [levelData, setLevelData] = useState([]);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();
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

  const fetchLevel = () => {
    setLevelData([
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'User OPD' },
    ]);
  };

  const fetchOrganizations = async (page) => {
    const organizationResponse = await getOrganizations(authHeader, {
      limit: 15,
      page,
    });

    if (page === opdData.totalPages) {
      setOpdData((prevData) => ({ ...prevData, hasMore: false }));
    }

    setOpdData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ...organizationResponse.result],
      totalPages: organizationResponse.pages,
    }));
  };

  const fetchUser = async () => {
    setIsLoading(true);

    try {
      const userResponse = await getUser(authHeader, id);

      setName(userResponse.name);
      setUsername(userResponse.username);

      setSelectedOpd({
        id: userResponse.organization.id,
        title: userResponse.organization.title,
      });

      setSelectedLevel({
        id: userResponse.admin_role_id,
        name: userResponse.admin_role_id === 1 ? 'Super Admin' : 'User OPD',
      });

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLevel();
    fetchUser();
  }, []);

  useEffect(() => {
    fetchOrganizations(opdData.currentPage);
  }, [opdData.currentPage]);

  const loadMoreData = async () => {
    setOpdData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userBody = {
        user_id: id,
        name: name || undefined,
        username: username || undefined,
        password: password || undefined,
        organization_id: selectedOpd.id,
        admin_role_id: selectedLevel.id,
      };

      const userResponse = await updateUser(userBody);

      showToastMessage(userResponse.message);
      navigate('../');
    } catch (err) {
      showToastMessage(err.message, 'error');
    }
  };

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
    setOpenOpdDialog(false);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setOpenLevelUserDialog(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setOpdData((prev) => ({ ...prev, isLoading: true }));
      setOpenCreateOpd(false);

      try {
        const organizationBody = { title: e.target.value };
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
        setOpdData((prev) => ({ ...prev, isLoading: false }));
        showToastMessage(err.message, 'error');
      }
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit User
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Nama OPD</Label>
            <Dialog open={openOpdDialog} onOpenChange={setOpenOpdDialog}>
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedOpd && selectedOpd.title}
                  label="--- Pilih Nama OPD ---"
                />
              </DialogTrigger>

              <DialogContent
                addButton
                title="Pilih Nama OPD"
                onCreateClick={() => setOpenCreateOpd((prev) => !prev)}
              >
                {transition((style, isOpen) => (
                  <div>
                    {isOpen && (
                      <animated.div
                        style={style}
                        className="w-72 bg-white rounded-md absolute z-10 -right-80 top-0 p-4"
                      >
                        <TextInput
                          required
                          placeholder="Masukan Nama OPD"
                          onKeyDown={handleKeyDown}
                        />
                        <p className="text-xs text-light-gray mt-2 text-left">
                          Tekan{' '}
                          <span className="itelic text-dark-gray">Enter</span>{' '}
                          untuk menyimpan
                        </p>
                      </animated.div>
                    )}
                  </div>
                ))}

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
                {opdData.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={opdData.items.length}
                    next={loadMoreData}
                    hasMore={opdData.hasMore}
                    height={500}
                    endMessage={
                      <h1 className="font-bold text-2xl text-gray-400">...</h1>
                    }
                  >
                    <List
                      data={opdData.items}
                      onSelectValue={handleSelectOpd}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label>Level User</Label>
            <Dialog
              open={openLevelUserDialog}
              onOpenChange={setOpenLevelUserDialog}
            >
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedLevel && selectedLevel.name}
                  label="--- Pilih Level User ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Level User" className="w-2/5">
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
            <Label>Nama</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label>Username</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label>Password</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              type="password"
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
        </form>
      </div>
    </>
  );
}

export default LoginAksesEdit;
