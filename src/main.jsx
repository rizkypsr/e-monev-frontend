import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./views/Auth/Login";
import PrivateRoute from "./views/PrivateRoute";
import AdminRoot from "./views/Admin/AdminRoot";
import AkunSaya from "./views/Admin/AkunSaya/AkunSaya";
import LoginAksesUser from "./views/Admin/LoginAksesUser/LoginAksesUser";
import Urusan from "./views/Admin/Urusan/Urusan";
import Laporan from "./views/Admin/Laporan/Laporan";
import Dashboard from "./views/Admin/Dashboard/Dashboard";
import AkunSayaForm from "./views/Admin/AkunSaya/AkunSayaForm";
import AkunSayaEdit from "./views/Admin/AkunSaya/AkunSayaEdit";
import LoginAksesTable from "./views/Admin/LoginAksesUser/LoginAksesTable";
import LoginAksesCreate from "./views/Admin/LoginAksesUser/LoginAksesCreate";
import UrusanTable from "./views/Admin/Urusan/UrusanTable";
import UrusanCreate from "./views/Admin/Urusan/UrusanCreate";
import UrusanEdit from "./views/Admin/Urusan/UrusanEdit";
import OrganisasiTable from "./views/Admin/Organisasi/OrganisasiTable";
import OrganisasiCreate from "./views/Admin/Organisasi/OrganisasiCreate";
import OrganisasiEdit from "./views/Admin/Organisasi/OrganisasiEdit";
import ProgramTable from "./views/Admin/Program/ProgramTable";
import ProgramCreate from "./views/Admin/Program/ProgramCreate";
import ProgramEdit from "./views/Admin/Program/ProgramEdit";
import Program from "./views/Admin/Program/Program";
import Kegiatan from "./views/Admin/Kegiatan/Kegiatan";
import Sasaran from "./views/Admin/Sasaran/Sasaran";
import Organisasi from "./views/Admin/Organisasi/Organisasi";
import KegiatanTable from "./views/Admin/Kegiatan/KegiatanTable";
import KegiatanCreate from "./views/Admin/Kegiatan/KegiatanCreate";
import KegiatanEdit from "./views/Admin/Kegiatan/KegiatanEdit";
import SasaranTable from "./views/Admin/Sasaran/SasaranTable";
import SasaranCreate from "./views/Admin/Sasaran/SasaranCreate";
import SasaranEdit from "./views/Admin/Sasaran/SasaranEdit";
import LoginAksesEdit from "./views/Admin/LoginAksesUser/LoginAksesEdit";
import LoginAksesDetail from "./views/Admin/LoginAksesUser/LoginAksesDetail";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import ErrorPage from "./views/ErrorPage";
import UserRoot from "./views/User/UserRoot";
import { ToastProvider } from "./context/ToastContext";
import UrusanDetail from "./views/Admin/Urusan/UrusanDetail";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/login"
      element={<Login />}
    />,
    <Route
      path="/"
      element={<UserRoot />}
      errorElement={<ErrorPage />}
    />,
    <Route
      path="/admin"
      loader={() => {
        return "Dashboard";
      }}
      handle={{
        crumb: (data) => (
          <Link
            to="/admin"
            className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2">
            e-Monev
          </Link>
        ),
      }}
      element={
        <PrivateRoute loginPath="/login">
          <AdminRoot />
        </PrivateRoute>
      }
      children={[
        <Route
          index
          key="adminDashboard"
          loader={() => {
            return "Dashboard";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Dashboard />}
        />,
        <Route
          key="akunSaya"
          path="akun-saya"
          loader={() => {
            return "Akun Saya";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<AkunSaya />}
          children={[
            <Route
              index
              key="akunSayaForm"
              element={<AkunSayaForm />}
            />,
            <Route
              key="akunSayaFormEdit"
              path="edit/:id"
              element={<AkunSayaEdit />}
            />,
          ]}
        />,
        <Route
          key="loginAksesUser"
          path="login-akses-user"
          loader={() => {
            return "Login Akses User";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<LoginAksesUser />}
          children={[
            <Route
              index
              key="loginAksesTable"
              element={<LoginAksesTable />}
            />,
            <Route
              key="loginAksesCreate"
              path="create"
              element={<LoginAksesCreate />}
            />,
            <Route
              key="loginAksesEdit"
              path="edit/:id"
              element={<LoginAksesEdit />}
            />,
            <Route
              key="loginAksesDetail"
              path="detail/:id"
              element={<LoginAksesDetail />}
            />,
          ]}
        />,
        <Route
          key="urusan"
          path="urusan"
          loader={() => {
            return "Urusan";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Urusan />}
          children={[
            <Route
              index
              key="urusan"
              element={<UrusanTable />}
            />,
            <Route
              key="urusanCreate"
              path="create"
              element={<UrusanCreate />}
            />,
            <Route
              key="urusanEdit"
              path="edit/:id"
              element={<UrusanEdit />}
            />,
            <Route
              key="urusanDetail"
              path="detail/:id"
              element={<UrusanDetail />}
            />,
          ]}
        />,
        <Route
          key="organisasi"
          path="organisasi"
          loader={() => {
            return "Organisasi";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Organisasi />}
          children={[
            <Route
              index
              key="organisasi"
              element={<OrganisasiTable />}
            />,
            <Route
              key="organisasiCreate"
              path="create"
              element={<OrganisasiCreate />}
            />,
            <Route
              key="organisasiEdit"
              path="edit/:id"
              element={<OrganisasiEdit />}
            />,
          ]}
        />,
        <Route
          key="program"
          path="program"
          loader={() => {
            return "Program";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Program />}
          children={[
            <Route
              index
              key="program"
              element={<ProgramTable />}
            />,
            <Route
              key="programCreate"
              path="create"
              element={<ProgramCreate />}
            />,
            <Route
              key="programEdit"
              path="edit/:id"
              element={<ProgramEdit />}
            />,
          ]}
        />,
        <Route
          key="kegiatan"
          path="kegiatan"
          loader={() => {
            return "Kegiatan";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Kegiatan />}
          children={[
            <Route
              index
              key="kegiatan"
              element={<KegiatanTable />}
            />,
            <Route
              key="kegiatanCreate"
              path="create"
              element={<KegiatanCreate />}
            />,
            <Route
              key="kegiatanEdit"
              path="edit/:id"
              element={<KegiatanEdit />}
            />,
          ]}
        />,
        <Route
          key="sasaran"
          path="sasaran"
          loader={() => {
            return "Sasaran";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Sasaran />}
          children={[
            <Route
              index
              key="sasaran"
              element={<SasaranTable />}
            />,
            <Route
              key="sasaranCreate"
              path="create"
              element={<SasaranCreate />}
            />,
            <Route
              key="sasaranEdit"
              path="edit/:id"
              element={<SasaranEdit />}
            />,
          ]}
        />,
        <Route
          key="laporan"
          path="laporan"
          loader={() => {
            return "Data Laporan";
          }}
          handle={{
            crumb: (data) => (
              <span className="ml-1 text-sm text-dark-gray md:ml-2">
                {data}
              </span>
            ),
          }}
          element={<Laporan />}
        />,
      ]}
    />,
  ]),
  {
    basename: "/",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
