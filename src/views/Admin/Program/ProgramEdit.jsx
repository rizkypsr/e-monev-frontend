import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { getProgram, updateProgram } from '../../../api/admin/program';
import ErrorPage from '../../ErrorPage';
import { useToastContext } from '../../../context/ToastContext';
import ReactLoading from '../../../components/Loading';

function ProgramEdit() {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [program, setProgram] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const fetchProgram = async () => {
    setIsLoading(true);

    try {
      const programResponse = await getProgram(authHeader, id);
      setCode(programResponse.code);
      setProgram(programResponse.title);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const programBody = {
        program_id: id,
        title: program,
        code,
      };
      const programResponse = await updateProgram(authHeader, programBody);

      setIsLoading(false);
      showToastMessage(programResponse, 'success');
      navigate('../');
    } catch (err) {
      setIsLoading(false);
      showToastMessage(err.message, 'error');
    }
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Program
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={code}
              required
              disabled
            />
          </div>
          <div className="mb-6">
            <Label>Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
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

export default ProgramEdit;
