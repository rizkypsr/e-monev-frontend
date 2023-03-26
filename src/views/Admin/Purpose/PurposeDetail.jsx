import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link, useParams } from "react-router-dom";
import getPurpose from "../../../api/admin/purpose/getPurpose";
import ErrorPage from "../../ErrorPage";

const PurposeDetail = () => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();
  const authHeader = useAuthHeader();

  useEffect(() => {
    fetchPurpose();
  }, []);

  async function fetchPurpose() {
    try {
      const purposeResponse = await getPurpose(authHeader, id);
      setCode(purposeResponse.id);
      setTitle(purposeResponse.title);
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return <ErrorPage errorMessage={error}></ErrorPage>;
  }

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
      <Link to="../" className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Detail Sasaran
        </h1>
      </Link>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                ID
              </th>
              <td className="px-6 py-4">{code}</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Indikator Program
              </th>
              <td className="px-6 py-4">{title}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurposeDetail;
