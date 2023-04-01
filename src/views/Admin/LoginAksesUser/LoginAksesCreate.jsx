import { ArrowLeftIcon, CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import SelectInputModal from '../../../components/SelectInputModal';
import { Dialog, DialogTrigger, DialogContent } from '../../../components/DialogContent';
import List from '../../../components/List';
import { getOrganizations } from '../../../api/admin/organization';
import register from '../../../api/auth/register';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

function LoginAksesCreate() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [openOpd, setOpenOpd] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openLevel, setOpenLevel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [opdData, setOpdData] = useState({
    items: [],
    hasMore: true,
    totalPages: 0,
    currentPage: 1,
  });
  const [levelData, setLevelData] = useState([]);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const fetchLevel = async () => {
    setLevelData([
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'User OPD' },
    ]);
  };

  const fetchOrganizations = async (page) => {
    const organizationResponse = await getOrganizations(authHeader, 0, 10, page);

    if (page === opdData.totalPages) {
      setOpdData((prevData) => ({ ...prevData, hasMore: false }));
    }

    setOpdData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ...organizationResponse.result],
      totalPages: organizationResponse.pages,
    }));
  };

  useEffect(() => {
    fetchLevel();
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

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
    setOpenOpd(false);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setOpenLevel(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Login Akses User</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">Tambah User</h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Nama OPD</Label>
            <Dialog open={openOpd} onOpenChange={setOpenOpd}>
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedOpd && selectedOpd.title}
                  label="--- Pilih Nama OPD ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Nama OPD">
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

                <InfiniteScroll
                  dataLength={opdData.items.length}
                  next={loadMoreData}
                  hasMore={opdData.hasMore}
                  height={500}
                  endMessage={<h1 className="font-bold text-2xl text-gray-400">...</h1>}
                >
                  <List data={opdData.items} onSelectValue={handleSelectOpd} />
                </InfiniteScroll>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label>Level User</Label>
            <Dialog open={openLevel} onOpenChange={setOpenLevel}>
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedLevel && selectedLevel.name}
                  label="--- Pilih Level User ---"
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
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="username">Username</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              type="password"
              placeholder="Masukan Password"
              value={password}
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
