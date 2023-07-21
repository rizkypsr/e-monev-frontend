import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import { createProgram } from '../../../api/admin/program';
import ReactLoading from '../../../components/Loading';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import SelectInputModal from '../../../components/SelectInputModal';
import List from '../../../components/List';
import Label from '../../../components/Label';

const purposes = [
  { id: 1, name: 'Urusan 1' },
  { id: 2, name: 'Urusan 2' },
];

function ProgramCreate() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [openPurpose, setOpenPurpose] = useState(false);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const handleSelectPurpose = (opd) => {
    setSelectedPurpose(opd);
    setOpenPurpose(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setTitleError('');

    if (!title) {
      setTitleError('Program harus diisi');
      return;
    }

    setIsLoading(true);

    try {
      const programBody = { title };
      const programResponse = await createProgram(authHeader, programBody);

      setIsLoading(false);
      showToastMessage(programResponse.message);
      navigate('../');
    } catch (error) {
      setIsLoading(false);
      showToastMessage(error.message, 'error');
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Program
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Program"
              value={title}
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Label>Urusan</Label>
            <Dialog open={openPurpose} onOpenChange={setOpenPurpose}>
              <DialogTrigger className="w-full lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedPurpose && selectedPurpose.name}
                  label="--- Pilih Urusan ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Urusan">
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

                <List data={purposes} onSelectValue={handleSelectPurpose} />
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

export default ProgramCreate;
