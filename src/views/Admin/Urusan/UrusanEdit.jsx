import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import { baseUrl } from "../../../utils/constants";
import { toast } from "react-toastify";

function UrusanEdit() {
  const authHeader = useAuthHeader();
  const [kode, setKode] = useState("");
  const [urusan, setUrusan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showToastMessage } = useToastContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrusan();
  }, []);

  async function fetchUrusan() {
    try {
      const response = await fetch(`${baseUrl}/occassion/detail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      const result = await response.json();
      if (response.ok) {
        setKode(result.data.result.code);
        setUrusan(result.data.result.title);
      } else {
        setError(new Error(result.message));
      }
    } catch (error) {
      setError(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/occassion/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ occassion_id: id, title: urusan }),
      });
      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        showToastMessage("Urusan berhasil diubah!");
        navigate("../");
      } else {
        setError(new Error(result.message));
        toast.error("Terjadi kesalahan pada server", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
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
        <h1 className="text-2xl font-semibold">Urusan</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link
          to="../"
          className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Urusan
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
              onChange={(e) => setKode(e.target.value)}
              required={true}
              disabled={true}
            />
          </div>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={urusan}
              onChange={(e) => setUrusan(e.target.value)}
              placeholder="Masukan Urusan"
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

export default UrusanEdit;
