import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import ErrorPage from '../../ErrorPage';
import Label from '../../../components/Label';
import {
  getOrganization,
  updateOrganization,
} from '../../../api/admin/organization';
import ReactLoading from '../../../components/Loading';

function OrganizationEdit() {
  const { id } = useParams();

  const [code, setCode] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  const fetchOrganization = async () => {
    setIsLoading(true);

    try {
      const organizationResponse = await getOrganization(authHeader, id);

      setIsLoading(false);
      setCode(organizationResponse.code);
      setOrganization(organizationResponse.title);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const organizationBody = {
        organization_id: id,
        title: organization,
        code,
      };
      const organizationResponse = await updateOrganization(
        authHeader,
        organizationBody
      );

      setIsLoading(false);
      showToastMessage(organizationResponse, 'success');
      navigate('../');
    } catch (err) {
      setError(err.message);
      setIsLoading(true);
      showToastMessage(err.message, 'error');
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Organisasi</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Organisasi
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
            <Label>Organisasi</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Organisasi"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
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

export default OrganizationEdit;
