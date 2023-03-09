import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TextInput from "../../../components/TextInput";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../../components/DialogContent";
import SuccessImg from "../../../assets/images/success.png";
import { useState } from "react";
import { useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import { useToastContext } from "../../../context/ToastContext";
import { baseUrl } from "../../../utils/constants";

function AkunSayaEdit() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordError("Pastikan Password yang anda masukan sama");
      return;
    }

    const requestBody = {
      user_id: authUser().id,
    };

    if (username) {
      requestBody.username = username;
    }

    if (password) {
      requestBody.password = password;
    }

    const res = await fetch(`${baseUrl}/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      signOut();
    } else {
      setError(new Error(result.message));
      toast.error("Terjadi kesalahan pada server", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    }
  }

  return (
    <>
      <Link
        to="../"
        className="flex space-x-3 items-center mb-8">
        <ArrowLeftIcon className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Ubah akun saya
        </h1>
      </Link>
      <form
        className="mt-4"
        onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label>Username Baru</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Username Baru"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label>Password</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            type="password"
            disableIcon={false}
            placeholder="Masukan Password"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        <div className="mb-6">
          <Label>Ulangi Password</Label>
          <TextInput
            className="mt-2 lg:w-2/3 xl:w-1/3"
            type="password"
            disableIcon={false}
            placeholder="Masukan Ulang Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={passwordError}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            className="w-full md:w-28"
            type="submit"
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
    </>
  );
}

export default AkunSayaEdit;
