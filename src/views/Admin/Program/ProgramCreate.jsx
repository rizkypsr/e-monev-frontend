import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import { baseUrl } from "../../../utils/constants";
import { makeRequest } from "../../../utils/makeRequest";
import { toast } from "react-toastify";

function ProgramCreate() {
  const [kode, setKode] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const url = `${baseUrl}/program/create`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    };
    const body = { code: kode, title: program };

    try {
      await makeRequest(url, headers, "POST", body);

      setLoading(false);
      showToastMessage("Urusan berhasil ditambahkan!");
      navigate("../");
    } catch (error) {
      setLoading(false);
      setError(error);

      toast.error("Terjadi kesalahan pada server", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  }

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

        <form
          className="mt-4"
          onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={kode}
              placeholder="Masukan Kode Program"
              onChange={(e) => setKode(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <Label>Program</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
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

export default ProgramCreate;
