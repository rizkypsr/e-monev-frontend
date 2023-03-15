import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { getProgram, updateProgram } from "../../../api/admin/program";
import ErrorPage from "../../ErrorPage";
import { useAuthHeader } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";

function ProgramEdit() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [program, setProgram] = useState("");
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  useEffect(() => {
    fetchProgram();
  }, []);

  async function fetchProgram() {
    try {
      const programResponse = await getProgram(authHeader, id);
      setCode(programResponse.code);
      setProgram(programResponse.title);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const programBody = {
        program_id: id,
        title: program,
        code,
      };
      const programResponse = await updateProgram(authHeader, programBody);

      showToastMessage(programResponse, "success");
      navigate("../");
    } catch (error) {
      console.error(error);
      setError(error);
      showToastMessage(error.message, "error");
    }
  }

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
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
            Edit Program
          </h1>
        </Link>

        <form
          className="mt-4"
          onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={code}
              required={true}
              disabled={true}
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

export default ProgramEdit;
