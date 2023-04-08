import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import { getTriwulan } from '../../../api/admin/report';
import ErrorPage from '../../ErrorPage';
import { getOrganizations } from '../../../api/admin/organization';
import DialogInputWrapper from '../../../components/DialogInputWrapper';
import { getOccasions } from '../../../api/admin/occasion';
import { getPurposes } from '../../../api/admin/purpose';
import DropdownWrapper from '../../../components/DropdownWrapper';
import { useToastContext } from '../../../context/ToastContext';
import { createMaster } from '../../../api/user/master';
import formattedDate from '../../../utils/formattedDate';

export default function MasterCreate() {
  const [occasionComponents, setOccasionComponents] = useState([]);
  const [master, setMaster] = useState({
    triwulan: {},
    organization: {},
    occasions: [],
    purpose: {},
    indicator: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const authHeader = useRef(useAuthHeader());
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  const onSelectTriwulan = useCallback(({ newValue, newLabel }) => {
    setMaster((prev) => ({
      ...prev,
      triwulan: {
        value: newValue,
        label: newLabel,
      },
    }));
  }, []);

  const handleSelect = (value, name) => {
    setMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOccasion = (value) => {
    setMaster((prev) => ({ ...prev, occasions: [...prev.occasions, value] }));
  };

  const addOccasionComponent = () => {
    setOccasionComponents(
      occasionComponents.concat(
        <DialogInputWrapper
          key={occasionComponents.length}
          name="occasions"
          label="Urusan"
          onFetching={getOccasions}
          onSelect={handleSelectOccasion}
        />
      )
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errorList = {};

    if (
      master.occasions.length < 1 ||
      master.occasions.length - 1 !== occasionComponents.length
    ) {
      errorList.occasion = 'Urusan belum dipilih';
    }

    if (Object.keys(master.triwulan).length === 0) {
      errorList.triwulan = 'Triwulan belum dipilih!';
    }

    if (Object.keys(master.organization).length === 0) {
      errorList.organization = 'Organisasi belum dipilih!';
    }

    if (Object.keys(master.purpose).length === 0) {
      errorList.purpose = 'Sasaran RPJMD belum dipilih!';
    }

    if (!master.indicator) {
      errorList.indicator = 'Indikator Kegiatan belum diisi!';
    }

    if (Object.keys(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    setIsLoading(true);

    try {
      const masterBody = {
        triwulan_id: master.triwulan.value,
        organization_id: master.organization.id,
        purpose_id: master.purpose.id,
        occassions: master.occasions.map((ocs) => ocs.id),
      };

      const masterResponse = await createMaster(authHeader.current, masterBody);

      showToastMessage(masterResponse);
    } catch (err) {
      showToastMessage(err.message, 'error');
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Master</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form className="w-4/5" onSubmit={onSubmit}>
          <div className="flex space-x-3 mb-6 items-center">
            <div className="flex-grow">
              <Label>Tanggal</Label>
              <TextInput
                disabled
                className="mt-2"
                value={formattedDate(Date.now())}
              />
            </div>
            <div className="flex-grow">
              <Label>Triwulan</Label>
              <DropdownWrapper
                onFetching={getTriwulan}
                onSelect={onSelectTriwulan}
                error={errors.triwulan}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label className="mb-2">Organisasi Perangkat Daerah (OPD)</Label>
            <DialogInputWrapper
              name="organization"
              label="Organisasi"
              onFetching={getOrganizations}
              onSelect={handleSelect}
              error={errors.organization}
            />
          </div>
          <div className="mb-3">
            <Label className="mb-2">Urusan</Label>
            <DialogInputWrapper
              name="occasions"
              label="Urusan"
              onFetching={getOccasions}
              onSelect={handleSelectOccasion}
            />
          </div>
          {occasionComponents}
          {errors.occasion && (
            <p className="mt-2 text-xs text-red-600">{errors.occasion}</p>
          )}
          <div className="mb-3">
            <Button
              onClick={addOccasionComponent}
              textColor="text-[#2F80ED]"
              icon={<PlusCircleIcon className="w-8 h-8" />}
            >
              Tambah Urusan Lain
            </Button>
          </div>
          <div className="mb-6">
            <Label className="mb-2">Sasaran RPJMD</Label>
            <DialogInputWrapper
              name="purpose"
              label="Sasaran"
              onFetching={getPurposes}
              onSelect={handleSelect}
              error={errors.purpose}
            />
          </div>
          <div className="mb-6">
            <Label>Indikator Kegiatan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis Indikator Kegiatan"
              value={master.indicator}
              onChange={(e) =>
                setMaster((prev) => ({
                  ...prev,
                  indicator: e.target.value,
                }))
              }
              error={errors.indicator}
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
    </div>
  );
}
