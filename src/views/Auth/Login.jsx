import Logo from "../../assets/images/big_logo.png";
import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Batik from "../../assets/images/batik.png";

function Login() {
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

          <form className="mt-4">
            <div className="mb-6">
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                className="mt-2"
                placeholder="Masukan Username"
                required={true}
              />
            </div>
            <div className="mb-6">
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
            <Button
              className="w-28"
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

export default Login;
