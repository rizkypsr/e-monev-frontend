import { useAuthUser, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/images/big_logo.png';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Img1 from '../../assets/images/img1.jpg';
import Img2 from '../../assets/images/img2.jpg';
import Img3 from '../../assets/images/img3.jpeg';
import Img4 from '../../assets/images/img4.jpeg';
import Img5 from '../../assets/images/img5.jpg';
import login from '../../api/auth/login';
import { useToastContext } from '../../context/ToastContext';
import Loading from '../../components/Loading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Login() {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const auth = useAuthUser();
  const { showToastMessage } = useToastContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation(login);

  const onSubmit = (data) => {
    const { username, password } = data;

    loginMutation.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: (res) => {
          if (res.statusCode === 200) {
            signIn({
              token: res.access_token,
              tokenType: 'Bearer',
              authState: res.payloadClient,
              expiresIn: 2880,
            });
          }
        },
        onError: (error) => {
          showToastMessage(
            `Terjadi kesalahan saat login: ${error.message}`,
            'error'
          );
        },
      }
    );
  };

  if (isAuthenticated()) {
    if (auth().role.id === 1) {
      return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
  }

  return (
    <div className="lg:flex h-screen">
      <style>{`
        .slick-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
      `}</style>
      <div className="hidden lg:block h-full sm:w-1/2">
        <Slider
          dots
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          speed={500}
          arrows={false}
          adaptiveHeight
          autoplay
        >
          {[Img1, Img2, Img3, Img4, Img5].map((img, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <img
                src={img}
                alt={`Gambar ${index + 1}`}
                className="h-screen w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center p-9">
        <div className="w-full flex flex-col">
          <div className="flex space-x-3">
            <img src={Logo} className="w-14" alt="Logo" />
            <div className="text-dark-gray">
              <h1 className="font-semibold">SISTEM INFORMASI E-MONTIR PEMDA</h1>
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

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <Label htmlFor="username">Username</Label>
                <TextInput
                  id="username"
                  name="username"
                  placeholder="Masukan Username"
                  register={register('username', {
                    required: 'Username wajib diisi!',
                  })}
                  error={errors.username?.message}
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="password">Password</Label>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Masukan Password"
                  register={register('password', {
                    required: 'Password wajib diisi!',
                  })}
                  error={errors.password?.message}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border rounded border-light-gray focus:ring-3 focus:ring-blue-300"
                  />
                  <Label htmlFor="remember" className="ml-2">
                    Ingatkan Saya
                  </Label>
                </div>

                <button type="button" className="text-sm text-primary">
                  Lupa Password
                </button>
              </div>

              {loginMutation.isLoading ? (
                <Loading />
              ) : (
                <Button
                  className="w-28"
                  type="submit"
                  background="bg-primary"
                  textColor="text-white"
                >
                  Masuk
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
