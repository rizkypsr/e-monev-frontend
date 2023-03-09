import Logo from "../../assets/images/big_logo.png";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Batik from "../../assets/images/batik.png";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { baseUrl } from "../../utils/constants";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    try {
      const res = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        if (
          signIn({
            token: data.access_token,
            tokenType: "Bearer",
            authState: data.payloadClient,
            expiresIn: 2880,
          })
        ) {
          console.log("Login Success");
          navigate("/admin");
        } else {
          alert("Terjadi kesalahan saat login");
        }

        console.log(data);
      } else {
        switch (data.message) {
          case "Data user tidak ditemukan":
            setUsernameError("Username yang Anda masukkan tidak tersedia");
            break;
          case "Username/password salah":
            setPasswordError("Password yang Anda masukkan salah");
          default:
            break;
        }

        console.error(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  if (isAuthenticated()) {
    return (
      <Navigate
        to={"/admin"}
        replace
      />
    );
  } else {
    return (
      <div className="lg:flex h-screen">
        <div className="hidden lg:block h-full sm:basis-1/2">
          <img
            src={Batik}
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

          <div className="self-center mt-32 w-full sm:w-2/3 xl:w-1/2">
            <h3 className="text-2xl font-semibold text-dark-gray">
              Selamat Datang
            </h3>
            <h4 className="text-light-gray">
              Login dibawah untuk akses akun Anda
            </h4>

            <form
              className="mt-4"
              onSubmit={onSubmit}>
              <div className="mb-6">
                <Label htmlFor="username">Username</Label>
                <TextInput
                  id="username"
                  className="mt-2"
                  name="username"
                  placeholder="Masukan Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={usernameError}
                  required={true}
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="password">Password</Label>
                <TextInput
                  id="password"
                  className="mt-2"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Masukan Password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border rounded border-light-gray focus:ring-3 focus:ring-blue-300"
                  />
                  <Label
                    htmlFor="remember"
                    className="ml-2">
                    Ingatkan Saya
                  </Label>
                </div>

                <button className="text-sm text-primary">Lupa Password</button>
              </div>
              <Button
                className="w-28"
                type="submit"
                background="bg-primary"
                textColor="text-white">
                Masuk
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
