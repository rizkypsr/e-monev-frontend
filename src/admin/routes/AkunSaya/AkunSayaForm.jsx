import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as EyeIcon } from "../../../assets/icons/eye.svg";

function AkunSayaForm() {
  return (
    <form>
      <div className="mb-6 w-96">
        <label
          for="username"
          className="block mb-2 text-sm text-dark-gray">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="bg-white border border-dark-gray text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-6 w-96">
        <label
          for="password"
          className="block mb-2 text-sm text-dark-gray">
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <EyeIcon />
          </div>
          <input
            id="password"
            type="password"
            className="bg-white border border-dark-gray text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-dark-gray block w-full p-2.5"
          />
        </div>
      </div>
      <Link
        to="edit"
        class="text-gray-100 bg-primary font-medium rounded-lg text-center flex justify-center items-center w-28 p-2">
        <EditIcon className="mr-2 -ml-1" />
        Edit
      </Link>
    </form>
  );
}

export default AkunSayaForm;
