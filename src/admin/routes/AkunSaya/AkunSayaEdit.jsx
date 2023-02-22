import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowBack } from "../../../assets/icons/arrow-back.svg";
import { ReactComponent as EyeIcon } from "../../../assets/icons/eye.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/check.svg";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/success.svg";
import { Button, Modal } from "flowbite-react";

function AkunSayaEdit() {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Modal
        show={showModal}
        size="md"
        onClose={onClose}>
        <Modal.Body>
          <div className="space-y-5 flex flex-col items-center justify-center py-12">
            <div className="p-12 bg-light-blue rounded-lg">
              <SuccessIcon />
            </div>
            <p className="text-lg leading-relaxed text-dark-gray font-semibold">
              Berhasil Disimpan!
            </p>
            <Button
              onClick={onClose}
              class="text-gray-100 bg-primary font-medium rounded-lg text-center flex justify-center items-center w-28 ">
              <ArrowBack className="mr-2 -ml-1 w-3" fill='white' />
              Kembali
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Link
        to="../"
        className="flex space-x-3 items-center mb-8">
        <ArrowBack />
        <h1 className="font-semibold text-lg text-dark-gray">Ubah akun saya</h1>
      </Link>
      <form>
        <div className="mb-6 w-96">
          <label
            for="username"
            className="block mb-2 text-sm text-dark-gray">
            Username Baru
          </label>
          <input
            id="username"
            type="text"
            className="bg-white border border-dark-gray text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6 w-96">
          <label
            for="password"
            className="block mb-2 text-sm text-dark-gray">
            Password Baru
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <EyeIcon />
            </div>
            <input
              id="password"
              type="password"
              className="bg-white border border-dark-gray text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5"
            />
          </div>
        </div>
        <div className="mb-6 w-96">
          <label
            for="repeat-password"
            className="block mb-2 text-sm text-dark-gray">
            Ulangi Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <EyeIcon />
            </div>
            <input
              id="repeat-password"
              type="password"
              className="bg-white border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5"
            />
          </div>
          <p class="mt-2 text-xs text-red-600">
            Password yang Anda masukkan tidak sama
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={onOpen}
            class="text-gray-100 bg-primary font-medium rounded-lg text-center flex justify-center items-center w-28 ">
            <CheckIcon className="mr-2 -ml-1" />
            Simpan
          </Button>
          <Link
            to="../"
            class="text-dark-gray bg-gray-200 font-medium rounded-lg text-center flex justify-center items-center w-28 ">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AkunSayaEdit;
