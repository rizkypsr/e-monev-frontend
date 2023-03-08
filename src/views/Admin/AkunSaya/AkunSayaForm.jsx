import { PencilIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";

function AkunSayaForm() {
  return (
    <form className="mt-4">
      <div className="mb-6">
        <Label htmlFor="username">Username</Label>
        <TextInput
          id="username"
          className="mt-2 lg:w-2/3 xl:w-1/3"
          placeholder="Masukan Username"
          value="admin_dinaskementerian"
          required={true}
        />
      </div> 
      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          className="mt-2 lg:w-2/3 xl:w-1/3"
          type="password"
          placeholder="Masukan Password"
          value="admin_dinaskementerian"
          required={true}
        />
      </div>
      <Link to={`edit/123`}>
        <Button
          className="w-full md:w-28"
          background="bg-primary"
          textColor="text-white"
          icon={<PencilIcon className="w-4 h-4" />}>
          Edit
        </Button>
      </Link>
    </form>
  );
}

export default AkunSayaForm;
