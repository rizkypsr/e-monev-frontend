import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";

function OrganisasiCreate() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Organisasi</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link
          to="../"
          className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Organisasi
          </h1>
        </Link>

        <form className="mt-4">
          <div className="mb-6">
            <Label>Jenis</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Jenis"
              required={true}
            />
          </div>
          <div className="mb-6">
            <Label>Induk</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Induk"
              required={true}
            />
          </div>
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
            <Label>Organisasi</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Organisasi"
              required={true}
            />
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

export default OrganisasiCreate;
