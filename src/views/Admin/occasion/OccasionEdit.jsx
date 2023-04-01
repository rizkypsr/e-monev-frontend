import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import { updateOccasion } from '../../../api/admin/occasion';
import getOccasionDetail from '../../../api/admin/occasion/getOccasionDetail';
import ErrorPage from '../../ErrorPage';
import ReactLoading from '../../../components/Loading';

function OccasionEdit() {
  const authHeader = useAuthHeader();
  const [code, setCode] = useState('');
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { showToastMessage } = useToastContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchOccasionDetail = async () => {
    setIsLoading(true);

    try {
      const occasionResponse = await getOccasionDetail(authHeader, id);
      setCode(occasionResponse.code);
      setOccasion(occasionResponse.title);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOccasionDetail();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const occasionBody = {
        occassion_id: id,
        title: occasion,
        code,
      };
      const occasionResponse = await updateOccasion(authHeader, occasionBody);

      setIsLoading(false);
      showToastMessage(occasionResponse);
      navigate('../');
    } catch (err) {
      setIsLoading(false);
      showToastMessage(err.message, 'error');
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
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
            Edit Urusan
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="Masukan Urusan"
              required
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

export default OccasionEdit;
