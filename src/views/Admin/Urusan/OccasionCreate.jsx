import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import "react-toastify/dist/ReactToastify.css";
import { useToastContext } from "../../../context/ToastContext";
import { createOccasion } from "../../../api/admin/occasion";
import { useState } from "react";

function OccasionCreate() {
  const [code, setCode] = useState("");
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  async function onSubmit(e) {
    e.preventDefault();

    setError(null);

    try {
      const occasionBody = { code, title: occasion };
      await createOccasion(authHeader, occasionBody);

      showToastMessage("Urusan berhasil ditambahkan!");
      navigate("../");
    } catch (error) {
      setError(error);
      showToastMessage(error.message, "erorr");
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
          onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              name="code"
              value={code}
              placeholder="Masukkan Kode Urusan"
              onChange={(e) => setCode(e.target.value)}
              required={true}
            />
          </div>
          <div className="mb-6">
            <Label>Urusan</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              name="title"
              value={occasion}
              placeholder="Masukkan Urusan"
              onChange={(e) => setOccasion(e.target.value)}
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

export default OccasionCreate;
