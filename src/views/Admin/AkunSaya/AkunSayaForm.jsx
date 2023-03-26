import { PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";

function AkunSayaForm() {
  const auth = useAuthUser();
  const [username, setUsername] = useState(auth().username);
  const [password, setPassword] = useState(auth().password);

  return (
    <form className="mt-4">
      <div className="mb-6">
        <Label htmlFor="username">Username</Label>
        <TextInput
          className="mt-2 lg:w-2/3 xl:w-1/3"
          placeholder="Masukan Username"
          value={username}
          disabled={true}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="password">Password</Label>
        <TextInput
          className="mt-2 lg:w-2/3 xl:w-1/3"
          type="password"
          placeholder="Masukan Password"
          value={password}
          disabled
          disableIcon
          onChange={(e) => setPassword(e.target.value)}
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
