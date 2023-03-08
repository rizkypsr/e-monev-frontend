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

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-dark-gray">
          <tbody>
            <tr class="bg-light-blue">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                No.
              </th>
              <td class="px-6 py-4">3</td>
            </tr>
            <tr class="bg-white">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Kode
              </th>
              <td class="px-6 py-4">10291092</td>
            </tr>
            <tr class="bg-light-blue">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Urusan
              </th>
              <td class="px-6 py-4">Lorem ipsum dolor sit.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoginAksesDetail;
