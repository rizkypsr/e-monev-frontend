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
import {
  getOrganization,
  updateOrganization,
} from "../../../api/admin/organization";

function OrganizationEdit() {
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganization();
  }, []);

  async function fetchOrganization() {
    try {
      const organizationResponse = await getOrganization(authHeader, id);
      setCode(organizationResponse.code);
      setOccasion(organizationResponse.title);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const organizationBody = {
        organization_id: id,
        title: organization,
        code,
      };
      const organizationResponse = await updateOrganization(
        authHeader,
        organizationBody
      );

      showToastMessage(organizationResponse, "success");
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
          onSubmit={onSubmit}>
          <div className="mb-6">
            <Label>Kode</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="mb-6">
            <Label>Organisasi</Label>
            <TextInput
              className="mt-2 lg:w-2/3 xl:w-1/3"
              placeholder="Masukan Organisasi"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
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
