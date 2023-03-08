import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/DialogContent";
import List from "../../../components/List";
import SelectInputModal from "../../../components/SelectInputModal";

function KegiatanCreate() {
  const data = [
    "Sekretariat Daerah",
    "Sekretariat Dewan Perwakilan Rakyat Daerah",
    "Inspektorat Daerah",
    "Badan Pengelolaan Keuangan Daearah",
    "Sekretariat Daerah",
    "Sekretariat Dewan Perwakilan Rakyat Daerah",
    "Inspektorat Daerah",
    "Badan Pengelolaan Keuangan Daearah",
    "Sekretariat Daerah",
    "Sekretariat Dewan Perwakilan Rakyat Daerah",
    "Inspektorat Daerah",
    "Badan Pengelolaan Keuangan Daearah",
    "Sekretariat Daerah",
    "Sekretariat Dewan Perwakilan Rakyat Daerah",
    "Inspektorat Daerah",
    "Badan Pengelolaan Keuangan Daearah",
    "Sekretariat Daerah",
    "Sekretariat Dewan Perwakilan Rakyat Daerah",
    "Inspektorat Daerah",
    "Badan Pengelolaan Keuangan Daearah",
  ];

  const [selectedOpd, setSelectedOpd] = useState(null);
  const [openOpd, setOpenOpd] = useState(false);

  const handleSelectOpd = (opd) => {
    setSelectedOpd(opd);
    setOpenOpd(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Program</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link
          to="../"
          className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Program
          </h1>
        </Link>

        <form className="mt-4">
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={29833}
              required={true}
              disabled={true}
            />
          </div>
          <div className="mb-6">
            <Label>ID Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={29833}
              required={true}
              disabled={true}
            />
          </div>
          <div className="mb-6">
            <Label>Kegiatan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Kegiatan"
              required={true}
            />
          </div>
          <div className="mb-6">
            <Label>Nama OPD</Label>
            <Dialog
              open={openOpd}
              onOpenChange={setOpenOpd}>
              <DialogTrigger className="lg:w-2/3 xl:w-1/3">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={selectedOpd}
                  label="--- Pilih Nama OPD ---"
                />
              </DialogTrigger>

              <DialogContent title="Pilih Nama OPD">
                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>

                <List
                  data={data}
                  onSelectValue={handleSelectOpd}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex space-x-3">
            <Button
              className="w-full md:w-28"
              background="bg-primary"
              textColor="text-white"
              icon={<CheckCircleIcon className="w-5 h-5" />}>
              Simpan
            </Button>
            <Link to="../">
              <Button
                className="w-full md:w-28 font-medium"
                background="bg-[#EAEAEA]"
                textColor="text-dark-gray">
                Batal
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default KegiatanCreate;
