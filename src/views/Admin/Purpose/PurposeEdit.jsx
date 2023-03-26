import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import getPurpose from "../../../api/admin/purpose/getPurpose";
import ErrorPage from "../../ErrorPage";
import updatePurpose from "../../../api/admin/purpose/updatePurpose";

function PurposeEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  useEffect(() => {
    fetchPurpose();
  }, []);

  const fetchPurpose = async () => {
    try {
      const purposeResponse = await getPurpose(authHeader, id);
      setTitle(purposeResponse.title);
    } catch (error) {
      setError(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const purposeBody = {
        purpose_id: id,
        title,
      };
      const purposeResponse = await updatePurpose(authHeader, purposeBody);

      showToastMessage(purposeResponse, "success");
      navigate("../");
    } catch (error) {
      showToastMessage(error.message, "error");
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sasaran</h1>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Sasaran
          </h1>
        </Link>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Indikator Program</Label>
            <TextInput
              required
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Nama Program"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
              className="w-full md:w-28"
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
}

export default PurposeEdit;