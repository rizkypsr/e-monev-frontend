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

function PurposeCreate() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sasaran</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link
          to="../"
          className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Sasaran
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
            <Label>Indikator Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Program"
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

export default PurposeCreate;
