import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToastContext } from "../../../context/ToastContext";
import { baseUrl } from "../../../utils/constants";

function UrusanCreate() {
  const [kode, setKode] = useState("");
  const [urusan, setUrusan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/occassion/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ code: kode, title: urusan }),
      });
      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        showToastMessage("Urusan berhasil ditambahkan!");
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
            Tambah Urusan
          </h1>
        </Link>

        <form
          className="mt-4"
          onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              name="code"
              value={kode}
              placeholder="Masukkan Kode Urusan"
              onChange={(e) => setKode(e.target.value)}
              required={true}
            />
          </div>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              name="title"
              value={urusan}
              placeholder="Masukkan Urusan"
              onChange={(e) => setUrusan(e.target.value)}
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
        <ToastContainer />
      </div>
    </>
  );
}

export default UrusanCreate;
