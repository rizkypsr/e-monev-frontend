import React, { useCallback, useState } from 'react';
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
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
import Dropdown from '../../../components/Dropdown';
import List from '../../../components/List';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import SelectInputModal from '../../../components/SelectInputModal';

const jenisPengadaan = [
  { id: 1, name: 'Barang' },
  { id: 2, name: 'Pekerjaan Konstruksi' },
  { id: 3, name: 'Jasa Konsultasi' },
  { id: 4, name: 'Jasa Lainnya' },
];
const caraPengadaan = [
  { id: 1, name: 'Swakelola' },
  { id: 2, name: 'Pengadaan Langsung' },
  { id: 3, name: 'Seleksi' },
  { id: 4, name: 'Tender' },
  { id: 5, name: 'Penunjukan Langsung' },
];

export default function TriwulanCreate() {
  const [data, setData] = useState({
    purpose: {},
    activity: {},
    sumberDana: '',
    paguDana: '',
    opdPengelola: '',
    pptk: '',
    nomorTanggalKontrak: '',
    kontraktor: '',
    jangkaWaktuPelaksanaan: '',
    nilaiKontrak: '',
    realisasiFisik: '',
    realisasiKeuangan: '',
    volumeKegiatan: '',
    outputKegiatan: '',
    manfaatKegiatanLangsung: '',
    manfaatKegiatanTidakLangsung: '',
    jumlahTenagaKerjaLokal: '',
    jumlahTenagaKerjaNonLokal: '',
    hambatan: '',
    solusiPermasalahan: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openJenisPengadaan, setOpenJenisPengadaan] = useState(false);
  const [selectedJenisPengadaan, setSelectedJenisPengadaan] = useState(null);
  const [openCaraPengadaan, setOpenCaraPengadaan] = useState(false);
  const [selectedCaraPengadaan, setSelectedCaraPengadaan] = useState(null);

  const handleSelectJenisPengadaan = (opd) => {
    setSelectedJenisPengadaan(opd);
    setOpenJenisPengadaan(false);
  };

  const handleSelectCaraPengadaan = (level) => {
    setSelectedCaraPengadaan(level);
    setOpenCaraPengadaan(false);
  };

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
      [name]: value,
    });
  };

  const handleCurrencyInputChange = (e) => {
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
            <Label className="mb-2">Nama Kegiatan</Label>
            <DialogInputWrapper
              label="Kegiatan"
              selectedItem={data.purpose.title}
              onFetching={getPurposes}
              error={errors.purpose}
              onSelect={handleSelectPurpose}
            />
          </div>

          <div>
            <Label className="mb-2">Lokasi Kegiatan</Label>
            <DialogInputWrapper
              label="Lokasi Kegiatan"
              selectedItem={data.activity.title}
              onFetching={getActivities}
              error={errors.activity}
              onSelect={handleSelectActivity}
            />
          </div>

          <div>
            <Label>Sumber Dana</Label>
            <TextInput
              name="targetRPJMDK"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.targetRPJMDK}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Pagu Dana (Rp)</Label>
            <TextInput
              leadingIcon
              name="paguDana"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.paguDana}
              onChange={handleCurrencyInputChange}
            />
          </div>

          <div>
            <Label>OPD Pengelolad</Label>
            <TextInput
              className="mt-2"
              name="opdPengelola"
              placeholder="Tulis disini..."
              value={data.opdPengelola}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Nama PPTK</Label>
            <TextInput
              name="pptk"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.pptk}
              onChange={handleTextInputChange}
            />
          </div>

          <div>
            <Label>Nomor dan Tanggal Kontrak</Label>
            <TextInput
              className="mt-2"
              name="nomorTanggalKontrak"
              placeholder="Tulis disini..."
              value={data.nomorTanggalKontrak}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Nama Kontraktor</Label>
            <TextInput
              name="kontraktor"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.kontraktor}
              onChange={handleTextInputChange}
            />
          </div>

          <div>
            <Label>Jangka Waktu Pelaksanaan</Label>
            <TextInput
              className="mt-2"
              name="jangkaWaktuPelaksanaan"
              placeholder="Tulis disini..."
              value={data.jangkaWaktuPelaksanaan}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Nilai Kontrak</Label>
            <TextInput
              leadingIcon
              name="nilaiKontrak"
              className="mt-2"
              placeholder="Tulis disini..."
              value={data.nilaiKontrak}
              onChange={handleCurrencyInputChange}
            />
          </div>
          <div>
            <Label>Realisasi Fisik</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis dalam persen (%)"
              name="realisasiFisik"
              type="number"
              value={data.realisasiFisik}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <Label>Realisasi Keuangan</Label>
            <TextInput
              className="mt-2"
              type="number"
              placeholder="Tulis dalam persen (%)"
              name="realisasiKeuangan"
              value={data.realisasiKeuangan}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <Label>Volume Kegiatan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="volumeKegiatan"
              value={data.volumeKegiatan}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Output Kegiatan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="outputKegiatan"
              value={data.outputKegiatan}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Manfaat Kegiatan (Kelompok sasaran Langsung)</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="manfaatKegiatanLangsung"
              value={data.manfaatKegiatanLangsung}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Manfaat Kegiatan (Kelompok sasaran Tidak Langsung)</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="manfaatKegiatanTidakLangsung"
              value={data.manfaatKegiatanTidakLangsung}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Jumlah Tenaga Kerja (Lokal)</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="jumlahTenagaKerjaLokal"
              value={data.jumlahTenagaKerjaLokal}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Jumlah Tenaga Kerja (Non Lokal)</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="jumlahTenagaKerjaNonLokal"
              value={data.jumlahTenagaKerjaNonLokal}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Hambatan dan Permasalahan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="hambatan"
              value={data.hambatan}
              onChange={handleTextInputChange}
            />
          </div>
          <div>
            <Label>Solusi Permasalahan</Label>
            <TextInput
              className="mt-2"
              placeholder="Tulis disini..."
              name="solusiPermasalahan"
              value={data.solusiPermasalahan}
              onChange={handleTextInputChange}
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2">Jenis Pengadaan</Label>
            <Dialog
              open={openJenisPengadaan}
              onOpenChange={setOpenJenisPengadaan}
            >
              <DialogTrigger className="w-full">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={
                    selectedJenisPengadaan && selectedJenisPengadaan.name
                  }
                  label="--- Pilih Jenis Pengadaan ---"
                />
              </DialogTrigger>

              <DialogContent
                title="Pilih Jenis Pengadaan"
                onCreateClick={() => setOpenJenisPengadaan((prev) => !prev)}
              >
                <List
                  data={jenisPengadaan}
                  onSelectValue={handleSelectJenisPengadaan}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Label className="mb-2">Cara Pengadaan</Label>
            <Dialog
              open={openCaraPengadaan}
              onOpenChange={setOpenCaraPengadaan}
            >
              <DialogTrigger className="w-full">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={
                    selectedCaraPengadaan && selectedCaraPengadaan.name
                  }
                  label="--- Pilih Cara Pengadaan ---"
                />
              </DialogTrigger>

              <DialogContent
                title="Pilih Cara Pengadaan"
                onCreateClick={() => setOpenCaraPengadaan((prev) => !prev)}
              >
                <List
                  data={caraPengadaan}
                  onSelectValue={handleSelectCaraPengadaan}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="col-span-2 mb-4">
            <Button
              className="w-full md:w-28"
              background="bg-primary"
              textColor="text-white"
              icon={<CheckCircleIcon className="w-5 h-5" />}
            >
              UPLOAD PDF, JPG,PNG, Video (5 MB)
            </Button>
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
