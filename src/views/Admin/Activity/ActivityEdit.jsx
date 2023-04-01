import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getActivity, updateActivity } from '../../../api/admin/activity';
import { getProgram, getPrograms } from '../../../api/admin/program';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import Label from '../../../components/Label';
import List from '../../../components/List';
import ReactLoading from '../../../components/Loading';
import SelectInputModal from '../../../components/SelectInputModal';
import TextInput from '../../../components/TextInput';
import { useToastContext } from '../../../context/ToastContext';
import ErrorPage from '../../ErrorPage';

function ActivityEdit() {
  const { id } = useParams();

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [programData, setProgramData] = useState({
    items: [],
    hasMore: true,
    totalPages: 0,
    currentPage: 1,
  });
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  const handleSelectProgram = (opd) => {
    setSelectedProgram(opd);
    setOpenProgramDialog(false);
  };

  const fetchPrograms = async (page) => {
    const programResponse = await getPrograms(authHeader, 0, 10, page);

    if (page === programData.totalPages) {
      setProgramData((prevData) => ({ ...prevData, hasMore: false }));
    }

    setProgramData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ...programResponse.result],
      totalPages: programResponse.pages,
    }));
  };

  const fetchProgram = async (programId) => {
    try {
      const programResponse = await getProgram(authHeader, programId);
      setSelectedProgram({
        id: programResponse.id,
        title: programResponse.title,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchActivity = async () => {
    setIsLoading(true);

    try {
      const occasionResponse = await getActivity(authHeader, id);

      setTitle(occasionResponse.title);

      await fetchProgram(occasionResponse.program_id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const loadMoreData = async () => {
    setProgramData((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const activityBody = {
        title,
        program_id: selectedProgram.id,
        activity_id: id,
      };
      const activityResponse = await updateActivity(authHeader, activityBody);

      setIsLoading(false);
      showToastMessage(activityResponse);
      navigate('../');
    } catch (err) {
      setIsLoading(false);
      showToastMessage(err.message, 'error');
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  useEffect(() => {
    fetchPrograms(programData.currentPage);
  }, [programData.currentPage]);

  if (error) {
    return <ErrorPage errorMessage={error} showBackButton />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Kegiatan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Kegiatan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={id}
              required
              disabled
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
            <Label>Program</Label>
            <Dialog
              open={openProgramDialog}
              onOpenChange={setOpenProgramDialog}
            >
              <DialogTrigger className="lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedProgram && selectedProgram.title}
                  label="--- Pilih Program ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Program">
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
                  dataLength={programData.items.length}
                  next={loadMoreData}
                  hasMore={programData.hasMore}
                  height={500}
                  endMessage={
                    <h1 className="font-bold text-2xl text-gray-400">...</h1>
                  }
                >
                  <List
                    data={programData.items}
                    onSelectValue={handleSelectProgram}
                  />
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

export default ActivityEdit;
