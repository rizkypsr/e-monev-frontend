import React from "react";
import SideImage from "../../../assets/images/login_side2.png";
import Logo from "../../../assets/images/big_logo.png";
import TextInput from "../../components/form/TextInput";
import Label from "../../components/form/Label";
import Button from "../../components/form/Button";

function Login() {
  return (
    <div className="flex h-screen">
      <div className="h-full basis-1/2">
        <img
          src={SideImage}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col basis-1/2 p-9">
        <div className="flex space-x-3">
          <img
            src={Logo}
            className="w-14"
          />
          <div className="text-dark-gray">
            <h1 className="font-semibold">SISTEM INFORMASI E-MONEY</h1>
            <h2>KABUPATEN SORONG</h2>
          </div>
        </div>

        <div className="self-center mt-24 w-fit">
          <h3 className="text-2xl font-semibold text-dark-gray">
            Selamat Datang
          </h3>
          <h4 className="text-light-gray">
            Login dibawah untuk akses akun Anda
          </h4>

          <form className="mt-4">
            <div className="mb-6 w-96">
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                className="mt-2"
                placeholder="Masukan Username"
                required={true}
              />
            </div>
            <div className="mb-6 w-96">
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                className="mt-2"
                type="password"
                placeholder="Masukan Password"
                required={true}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border rounded border-light-gray focus:ring-3 focus:ring-blue-300"
                  required
                />
                <Label
                  htmlFor="remember"
                  className="ml-2">
                  Ingatkan Saya
                </Label>
              </div>

              <button className="text-sm text-primary">Lupa Password</button>
            </div>
            <Button>Masuk</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
