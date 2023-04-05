import React, { useState } from 'react';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Label } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import 'react-toastify/dist/ReactToastify.css';
import { useToastContext } from '../../../context/ToastContext';
import { createOccasion } from '../../../api/admin/occasion';
import ReactLoading from '../../../components/Loading';

export default function OccasionCreate() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  async function onSubmit(e) {
    e.preventDefault();

    setTitleError('');

    if (!title) {
      setTitleError('Urusan belum diisi');
      return;
    }

    setIsLoading(true);

    try {
      const occasionBody = { title };
      const occasionResponse = await createOccasion(authHeader, occasionBody);

      setIsLoading(false);
      showToastMessage(occasionResponse);
      navigate('../');
    } catch (error) {
      setIsLoading(false);
      showToastMessage(error.message, 'error');
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Urusan</h1>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Urusan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukkan Urusan"
              value={title}
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
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
