import { ArrowLeftIcon, CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { Dialog, DialogContent, DialogTrigger } from '../../../components/DialogContent';
import List from '../../../components/List';
import SelectInputModal from '../../../components/SelectInputModal';
import { getPrograms } from '../../../api/admin/program';
import { createActivity } from '../../../api/admin/activity';
import { useToastContext } from '../../../context/ToastContext';

function ActivityCreate() {
  const [selectedOpd, setSelectedOpd] = useState(null);
  const [openOpd, setOpenOpd] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');

  const [pageData, setPageData] = useState({
    items: [],
    hasMore: true,
    totalPages: 0,
    currentPage: 1,
  });

  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
    setOpenOpd(false);
  };

  const fetchPrograms = async (page) => {
    const programResponse = await getPrograms(authHeader, 0, 10, page);

    if (page === pageData.totalPages) {
      setPageData((prevData) => ({ ...prevData, hasMore: false }));
    }

    setPageData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ...programResponse.result],
      totalPages: programResponse.pages,
    }));
  };

  useEffect(() => {
    fetchPrograms(pageData.currentPage);
  }, [pageData.currentPage]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const activityBody = {
        code,
        title,
        program_id: selectedOpd.id,
      };
      const activityResponse = await createActivity(authHeader, activityBody);

      showToastMessage(activityResponse);
      navigate('../');
    } catch (error) {
      showToastMessage(error.message, 'error');
    }
  };

  const loadMoreData = async () => {
    setPageData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">Tambah Program</h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={code}
              placeholder="Masukan Kode Kegiatan"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label>Kegiatan</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Kegiatan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
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

              <DialogContent title="Pilih Nama OPD" className="w-2/4">
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
                  dataLength={pageData.items.length}
                  next={loadMoreData}
                  hasMore={pageData.hasMore}
                  height={500}
                  endMessage={<h1 className="font-bold text-2xl text-gray-400">...</h1>}
                >
                  <List data={pageData.items} onSelectValue={handleSelectOpd} />
                </InfiniteScroll>
              </DialogContent>
            </Dialog>
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

export default ActivityCreate;
