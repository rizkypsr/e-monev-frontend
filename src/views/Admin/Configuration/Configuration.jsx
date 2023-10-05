import { useMutation, useQuery, useQueryClient } from 'react-query';
import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useAuthHeader } from 'react-auth-kit';
import Label from '../../../components/Label';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';

import './dateRangePicker.css';
import setTriwulanSetting from '../../../api/admin/configuration/setTriwulanSetting';
import formattedDate from '../../../utils/formattedDate';
import { useToastContext } from '../../../context/ToastContext';
import getTriwulanSetting from '../../../api/admin/configuration/getTriwulanSetting';

const Configuration = () => {
  const [datePicker, setDatePicker] = useState([new Date(), new Date()]);
  const queryClient = useQueryClient();
  const { showToastMessage } = useToastContext();
  const authHeader = useAuthHeader();

  const configurationQuery = useQuery({
    queryKey: ['get_configuration'],
    queryFn: () => getTriwulanSetting(authHeader()),
    onSuccess: (result) => {
      setDatePicker([
        result.data[0].TRIWULAN_STARTED,
        result.data[1].TRIWULAN_ENDED,
      ]);
    },
  });

  const updateMutation = useMutation(setTriwulanSetting);

  const onSubmit = (e) => {
    e.preventDefault();

    const newData = datePicker.map((date) => formattedDate(date));

    updateMutation.mutate(
      {
        body: [
          {
            TRIWULAN_STARTED: newData[0],
          },
          {
            TRIWULAN_ENDED: newData[1],
          },
        ],
        token: authHeader(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('get_configuration');
          showToastMessage('Berhasil mengubah konfigurasi');
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  if (configurationQuery.isLoading) {
    return <ReactLoading />;
  }

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
              onChange={setDatePicker}
              value={datePicker}
            />
          </div>

          {updateMutation.isLoading ? (
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
};

export default Configuration;
