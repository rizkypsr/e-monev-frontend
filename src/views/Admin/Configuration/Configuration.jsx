import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Label from '../../../components/Label';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';

import './dateRangePicker.css';

function Configuration() {
  const [datePicker, onChange] = useState([new Date(), new Date()]);

  const onSubmit = () => {};

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Konfigurasi</h1>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Tanggal OPD (untuk Pengisian Tambah Data Triwulan)</Label>
            <DateRangePicker
              className="mt-2"
              onChange={onChange}
              value={datePicker}
            />
          </div>

          {false ? (
            <ReactLoading />
          ) : (
            <Button
              type="submit"
              className="w-full md:w-28"
              background="bg-primary"
              textColor="text-white"
              icon={<CheckCircleIcon className="w-5 h-5" />}
            >
              Simpan
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default Configuration;
