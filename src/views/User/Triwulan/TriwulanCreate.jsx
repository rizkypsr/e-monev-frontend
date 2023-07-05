import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Label from '../../../components/Label';
import TextInput from '../../../components/TextInput';
import formattedDate from '../../../utils/formattedDate';
import ReactLoading from '../../../components/Loading';
import Button from '../../../components/Button';
import DialogInputWrapper from '../../../components/DialogInputWrapper';
import { getPurposes } from '../../../api/admin/purpose';
import { getActivities } from '../../../api/admin/activity';
import formatRupiah from '../../../utils/formatRupiah';

export default function TriwulanCreate() {
  const [data, setData] = useState({
    purpose: {},
    activity: {},
    targetRPJMDK: '',
    targetRPJMDRP: '',
    capaianRPJMDK: '',
    capaianRPJMDRP: '',
    targetRKPDPK: '',
    targetRKPDPR: '',
    triwulanK: '',
    triwulanR: '',
    realisasiCapaianK: '3',
    realisasiCapaianR: formatRupiah('3000000'),
    realisasiKerjaK: '33',
    realisasiKerjaR: formatRupiah('3000000'),
    tingkatanCapaianK: '33',
    tingkatanCapaianR: formatRupiah('1400000'),
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPurpose = (item) => {
    setData({
      ...data,
      purpose: item,
    });
  };

  const handleSelectActivity = (item) => {
    setData({
      ...data,
      activity: item,
    });
  };

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: formatRupiah(value),
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Tambah Data Triwulan</h1>
      </div>

      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <form className="w-4/5 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Tanggal Input Data</Label>
            <TextInput
              disabled
              className="mt-2"
              value={formattedDate(Date.now())}
            />
          </div>

          <div>
            <Label className="mb-2">Sasaran</Label>
            <DialogInputWrapper
              label="Sasaran"
              selectedItem={data.purpose.title}
              onFetching={getPurposes}
              error={errors.purpose}
              onSelect={handleSelectPurpose}
            />
          </div>

          <div>
            <Label className="mb-2">Indikator Kegiatan</Label>
            <DialogInputWrapper
              label="Kegiatan"
              selectedItem={data.activity.title}
              onFetching={getActivities}
              error={errors.activity}
              onSelect={handleSelectActivity}
            />
          </div>

          <div>
            <Label>Target RPJMD (K)</Label>
            <TextInput
              name="targetRPJMDK"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.targetRPJMDK}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Target RPJMD (Rp)</Label>
            <TextInput
              leadingIcon
              name="targetRPJMDRP"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.targetRPJMDRP}
              onChange={handleNumberInputChange}
            />
          </div>

          <div>
            <Label>Capaian RPJMD s/d Tahun Lalu(K)</Label>
            <TextInput
              className="mt-2"
              name="capaianRPJMDK"
              placeholder="Tulis disini..."
              value={data.capaianRPJMDK}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Capaian RPJMD s/d Tahun Lalu(K) (Rp)</Label>
            <TextInput
              leadingIcon
              name="capaianRPJMDRP"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.capaianRPJMDRP}
              onChange={handleNumberInputChange}
            />
          </div>

          <div>
            <Label>Target RKPDP Tahun Sekarang (K)</Label>
            <TextInput
              className="mt-2"
              name="targetRKPDPK"
              placeholder="Tulis disini..."
              value={data.targetRKPDPK}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Target RKPDP Tahun Sekarang (Rp)</Label>
            <TextInput
              leadingIcon
              name="targetRKPDPR"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.targetRKPDPR}
              onChange={handleNumberInputChange}
            />
          </div>

          <div>
            <Label>Triwulan 1 (K)</Label>
            <TextInput
              className="mt-2"
              name="triwulanK"
              placeholder="Tulis disini..."
              value={data.triwulanK}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Triwulan 1 (Rp)</Label>
            <TextInput
              leadingIcon
              name="triwulanR"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.triwulanR}
              onChange={handleNumberInputChange}
            />
          </div>

          <div>
            <Label>Realisasi Capaian Kinerja RKPD (K)</Label>
            <TextInput
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.realisasiCapaianK}
            />
          </div>
          <div>
            <Label>Realisasi Capaian Kinerja RKPD (Rp)</Label>
            <TextInput
              leadingIcon
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.realisasiCapaianR}
            />
          </div>

          <div>
            <Label>Realisasi Kerja dan Anggaran RPJMD (K)</Label>
            <TextInput
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.realisasiKerjaK}
            />
          </div>
          <div>
            <Label>Realisasi Kerja dan Anggaran RPJMD (Rp)</Label>
            <TextInput
              leadingIcon
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.realisasiKerjaR}
            />
          </div>

          <div>
            <Label>Tingkatan Capaian Kinerja dan Realisasi RPJMD (K)</Label>
            <TextInput
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.tingkatanCapaianK}
            />
          </div>
          <div className="mb-4">
            <Label>Tingkatan Capaian Kinerja dan Realisasi RPJMD (Rp)</Label>
            <TextInput
              leadingIcon
              disabled
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.tingkatanCapaianR}
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
