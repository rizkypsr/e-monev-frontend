import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "../../../utils/constants";
import ErrorPage from "../../ErrorPage";

function OrganisasiDetail() {
  const [kode, setKode] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const authHeader = useAuthHeader();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`${baseUrl}/org/detail/${id}`, {
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
        setOrganisasi(title);
      } else {
        const errorMessage = "Terjadi kesalahan pada server";
        setError(new Error(errorMessage));
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      setError(error);
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
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <Link
        to="../"
        className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Detail User
        </h1>
      </Link>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                No.
              </th>
              <td className="px-6 py-4">{id}</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Kode
              </th>
              <td className="px-6 py-4">{kode}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Urusan
              </th>
              <td className="px-6 py-4">{organisasi}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrganisasiDetail;
