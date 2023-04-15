import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import { getTriwulan } from '../../../api/admin/report';
import { getOrganizations } from '../../../api/admin/organization';
import DialogInputWrapper from '../../../components/DialogInputWrapper';
import { getOccasions } from '../../../api/admin/occasion';
import { getPurposes } from '../../../api/admin/purpose';
import DropdownWrapper from '../../../components/DropdownWrapper';
import { useToastContext } from '../../../context/ToastContext';
import { createMaster } from '../../../api/user/master';
import formattedDate from '../../../utils/formattedDate';
import {
  resetAll,
  setIndicator,
  setOccasions,
  setOrganization,
  setProgram,
  setPurpose,
  setTriwulan,
} from '../../../redux/master/masterSlice';
import { getPrograms } from '../../../api/admin/program';

export default function MasterCreate() {
  const { organization, occasions, indicator, purpose, triwulan, program } =
    useSelector((state) => state.master);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const authHeader = useRef(useAuthHeader());
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  const removeOccasionComponent = (indexToRemove) => {
    const newOccasions = occasions.filter(
      (_, index) => index !== indexToRemove
    );
    dispatch(setOccasions(newOccasions));
  };

  const handleSelectTriwulan = (item) => {
    dispatch(
      setTriwulan({
        id: item.newValue,
        name: item.newLabel,
      })
    );
  };

  const handleSelectOccasion = (item) => {
    const newOccasions = [...occasions];

    const updatedValue = newOccasions.map((ocs) => {
      if (ocs.id === item.id) {
        return item.value;
      }
      return ocs;
    });

    dispatch(setOccasions(updatedValue));
  };

  const handleSelectOrganization = (item) => {
    dispatch(setOrganization(item));
  };

  const handleSelectPurpose = (item) => {
    dispatch(setPurpose(item));
  };

  const handleSelectProgram = (item) => {
    dispatch(setProgram(item));
  };

  const handleIndicatorOnChange = (e) => {
    dispatch(setIndicator(e.target.value));
  };

  const addOccasionComponent = () => {
    const id = uuid();
    dispatch(setOccasions([...occasions, { id }]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errorList = {};

    const isOccasionExist = occasions.every(
      (obj) => Object.keys(obj).length > 1
    );

    if (occasions.length <= 0 || !isOccasionExist) {
      errorList.occasion = 'Urusan belum dipilih';
    }

    if (Object.keys(triwulan).length === 0) {
      errorList.triwulan = 'Triwulan belum dipilih!';
    }

    if (Object.keys(organization).length === 0) {
      errorList.organization = 'Organisasi belum dipilih!';
    }

    if (Object.keys(purpose).length === 0) {
      errorList.purpose = 'Sasaran RPJMD belum dipilih!';
    }

    if (Object.keys(program).length === 0) {
      errorList.program = 'Program belum dipilih!';
    }

    if (!indicator) {
      errorList.indicator = 'Indikator Kegiatan belum diisi!';
    }

    if (Object.keys(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    setIsLoading(true);

    try {
      const masterBody = {
        triwulan_id: triwulan.id,
        organization_id: organization.id,
        purpose_id: purpose.id,
        program_id: program.id,
        occassions: occasions.map((ocs) => ocs.id),
      };

      const masterResponse = await createMaster(authHeader.current, masterBody);

      dispatch(resetAll());
      showToastMessage(masterResponse);
    } catch (err) {
      showToastMessage(err.message, 'error');
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Master</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form className="w-4/5" onSubmit={onSubmit}>
          <div className="flex space-x-3 mb-3 items-center">
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
                onSelect={handleSelectTriwulan}
                error={errors.triwulan}
              />
            </div>
          </div>
          <div className="mb-3">
            <Label className="mb-2">Organisasi Perangkat Daerah (OPD)</Label>
            <DialogInputWrapper
              label="Organisasi"
              selectedItem={organization.title}
              onFetching={getOrganizations}
              onSelect={handleSelectOrganization}
              error={errors.organization}
            />
          </div>
          <div className="mb-3">
            <Label className="mb-2">Urusan</Label>
            <div className='space-y-3'>
              {occasions.map((ocs, index) => (
                <DialogInputWrapper
                  trailingIcon={index > 0}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  label="Urusan"
                  selectedItem={ocs.title}
                  onFetching={getOccasions}
                  onSelect={(value) =>
                    handleSelectOccasion({ id: ocs.id, value })
                  }
                  onDelete={() => removeOccasionComponent(index)}
                />
              ))}
            </div>
          </div>
          {errors.occasion && (
            <p className="mt-2 text-xs text-red-600">{errors.occasion}</p>
          )}
          <div className="mb-3">
            <Button
              className="px-0"
              onClick={addOccasionComponent}
              textColor="text-[#2F80ED]"
              icon={<PlusCircleIcon className="w-8 h-8" />}
            >
              Tambah Urusan Lain
            </Button>
          </div>
          <div className="mb-3">
            <Label className="mb-2">Sasaran RPJMD</Label>
            <DialogInputWrapper
              label="Sasaran"
              selectedItem={purpose.title}
              onFetching={getPurposes}
              error={errors.purpose}
              onSelect={handleSelectPurpose}
            />
          </div>
          <div className="mb-3">
            <Label className="mb-2">Program</Label>
            <DialogInputWrapper
              label="Program"
              selectedItem={program.title}
              onFetching={getPrograms}
              error={errors.program}
              onSelect={handleSelectProgram}
            />
          </div>
          <div className="mb-6">
            <Label>Indikator Kegiatan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis Indikator Kegiatan"
              value={indicator}
              onChange={handleIndicatorOnChange}
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
