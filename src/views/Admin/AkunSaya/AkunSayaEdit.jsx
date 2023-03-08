import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
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

function AkunSayaEdit() {
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
      <form className="mt-4">
        <div className="mb-6">
          <Label htmlFor="username">Username</Label>
          <TextInput
            id="username"
            className="mt-2 lg:w-2/3 xl:w-1/3"
            placeholder="Masukan Username"
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
            required={true}
          />
        </div>
        <Dialog>
          <DialogContent className="px-28 py-14">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-10 bg-[#E2F8FF] w-fit rounded-lg">
                <img src={SuccessImg} />
              </div>

              <div>
                <h1 className="mt-6 font-semibold text-lg leading-7 text-dark-gray">
                  Berhasil Disimpan!
                </h1>
                <DialogClose>
                  <Button
                    className="w-full md:w-28 mt-8"
                    type="modal"
                    background="bg-primary"
                    textColor="text-white"
                    icon={<ArrowLeftIcon className="w-5 h-5" />}>
                    Simpan
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
          <div className="flex space-x-3">
            <DialogTrigger>
              <Button
                className="w-full md:w-28"
                type="modal"
                background="bg-primary"
                textColor="text-white"
                icon={<CheckCircleIcon className="w-5 h-5" />}>
                Simpan
              </Button>
            </DialogTrigger>
            <Link to="../">
              <Button
                className="w-full md:w-28 font-medium"
                background="bg-[#EAEAEA]"
                textColor="text-dark-gray">
                Batal
              </Button>
            </Link>
          </div>
        </Dialog>
      </form>
    </>
  );
}

export default AkunSayaEdit;
