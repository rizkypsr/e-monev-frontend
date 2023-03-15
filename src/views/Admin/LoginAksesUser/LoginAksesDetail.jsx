import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

function LoginAksesDetail() {
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
              <td className="px-6 py-4">3</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Kode
              </th>
              <td className="px-6 py-4">10291092</td>
            </tr>
            <tr className="bg-light-blue">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Urusan
              </th>
              <td className="px-6 py-4">Lorem ipsum dolor sit.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoginAksesDetail;
