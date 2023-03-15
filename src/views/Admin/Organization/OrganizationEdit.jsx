import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../../utils/constants";
import ErrorPage from "../../ErrorPage";
import Label from "../../../components/Label";

function OrganizationEdit() {
  const { id } = useParams();

  const [kode, setKode] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganisasi();
  }, []);

  async function fetchOrganisasi() {
    try {
      const response = await fetch(`${baseUrl}/org/detail/${1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      const result = await response.json();

      if (response.ok) {
        const { code, title } = result.data.result;
        setKode(code);
        setUrusan(title);
      } else {
        const errorMessage = "Terjadi kesalahan pada server";
        setError(new Error(errorMessage));
        console.log("err");
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      setError(error);
      const errorMessage = "Terjadi kesalahan pada server";
      console.log("err");
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/org/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ organization_id: id, title: organisasi }),
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

  if (error) {
    return (
      <>
        <ErrorPage />;
        <ToastContainer />
      </>
    );
  }

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
            Edit Organisasi
          </h1>
        </Link>

        <form
          className="mt-4"
          onSubmit={handleSubmit}>
          {/* <div className="mb-6">
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
          </div> */}
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="mb-6">
            <Label>Organisasi</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Organisasi"
              value={organisasi}
              onChange={(e) => setOrganisasi(e.target.value)}
              required
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
      <ToastContainer />
    </>
  );
}

export default OrganizationEdit;
