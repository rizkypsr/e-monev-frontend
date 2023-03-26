import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import createPurpose from "../../../api/admin/purpose/createPurpose";
import showToastMsg from "../../../utils/showToast";

const PurposeCreate = () => {
  const [title, setTitle] = useState("");

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage, hideToastMessage } = useToastContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const purposeBody = { title };
      const purposeResponse = await createPurpose(authHeader, purposeBody);

      showToastMessage(purposeResponse);
      navigate("../");
    } catch (error) {
      showToastMsg("error", error.message, hideToastMessage);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sasaran</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Tambah Sasaran
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Indikator Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Program"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex space-x-3">
            <Button
              className="w-full md:w-28"
              type="submit"
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
        </form>
      </div>
    </>
  );
};

export default PurposeCreate;
