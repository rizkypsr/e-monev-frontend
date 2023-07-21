import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import { animated, useTransition } from '@react-spring/web';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import List from '../../../components/List';
import SelectInputModal from '../../../components/SelectInputModal';
import { createProgram, getPrograms } from '../../../api/admin/program';
import { createActivity } from '../../../api/admin/activity';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

function ActivityCreate() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateActivity, setOpenCreateActivity] = useState(false);
  const [openCreateOpd, setOpenCreateOpd] = useState(false);
  const [pageData, setPageData] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [activityData, setActivityData] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [titleError, setTitleError] = useState('');
  const [programError, setProgramError] = useState('');

  const navigate = useNavigate();
  const authHeader = useAuthHeader();
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

  const transitionCreateActivity = useTransition(openCreateActivity, {
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

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setOpenActivityDialog(false);
  };

  const handleSelectProgram = (opd) => {
    setSelectedProgram(opd);
    setOpenProgramDialog(false);
  };

  const fetchPrograms = async (page) => {
    const programResponse = await getPrograms(authHeader, {
      limit: 15,
      pageNumber: page,
    });

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

    const errors = {};

    if (!title) {
      errors.title = 'Kegiatan harus diisi';
    }

    if (!selectedProgram) {
      errors.program = 'Program belum dipilih';
    }

    if (Object.keys(errors).length > 0) {
      setTitleError(errors.title || '');
      setProgramError(errors.program || '');
      return;
    }

    setIsLoading(true);

    try {
      const activityBody = {
        title,
        program_id: selectedProgram.id,
      };
      const activityResponse = await createActivity(authHeader, activityBody);

      setIsLoading(false);
      showToastMessage(activityResponse);
      navigate('../');
    } catch (error) {
      setIsLoading(false);
      showToastMessage(error.message, 'error');
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setPageData((prev) => ({ ...prev, isLoading: true }));
      setOpenCreateOpd(false);

      try {
        const programBody = { title: e.target.value };
        const programResponse = await createProgram(authHeader, programBody);

        setPageData((prev) => ({
          ...prev,
          isLoading: false,
          items: [
            {
              id: programResponse.data.id,
              title: programResponse.data.title,
            },
            ...prev.items,
          ],
        }));

        setOpenCreateOpd(false);
        showToastMessage(programResponse);
      } catch (err) {
        setOpenCreateOpd(false);
        setPageData((prev) => ({ ...prev, isLoading: false }));
        showToastMessage(err.message, 'error');
      }
    }
  };

  const loadMoreData = async () => {
    setPageData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const loadMoreActivityData = async () => {
    setActivityData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Kegiatan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Kegiatan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Nama Kegiatan</Label>
            <Dialog
              open={openActivityDialog}
              onOpenChange={setOpenActivityDialog}
            >
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedActivity && selectedActivity.title}
                  label="--- Pilih Nama Kegiatan ---"
                />
              </DialogTrigger>

              <DialogContent
                addButton
                title="Pilih Nama Kegiatan"
                onCreateClick={() => setOpenCreateActivity((prev) => !prev)}
              >
                {transitionCreateActivity((style, isOpen) => (
                  <div>
                    {isOpen && (
                      <animated.div
                        style={style}
                        className="w-72 bg-white rounded-md absolute z-10 -right-80 top-0 p-4"
                      >
                        <TextInput
                          required
                          placeholder="Masukan Nama Kegiatan"
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
                {activityData.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={activityData.items.length}
                    next={loadMoreActivityData}
                    hasMore={activityData.hasMore}
                    height={500}
                  >
                    <List
                      data={activityData.items}
                      onSelectValue={handleSelectActivity}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label>Nama Sub Bagian</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Sub Kegiatan"
              value={title}
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label>Program</Label>
            <Dialog
              open={openProgramDialog}
              onOpenChange={setOpenProgramDialog}
            >
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedProgram && selectedProgram.title}
                  label="--- Pilih Program ---"
                  error={programError}
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
                          placeholder="Masukan Nama Program"
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
                {pageData.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={pageData.items.length}
                    next={loadMoreData}
                    hasMore={pageData.hasMore}
                    height={500}
                  >
                    <List
                      data={pageData.items}
                      onSelectValue={handleSelectProgram}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          {isLoading ? (
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
}

export default ActivityCreate;
