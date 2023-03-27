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
import PrivateRoute from "./layouts/PrivateRoute";
import AdminLayout from "./layouts/AdminRoot";
import AkunSaya from "./views/Admin/AkunSaya/AkunSaya";
import LoginAksesUser from "./views/Admin/LoginAksesUser/LoginAksesUser";
import Occasion from "./views/Admin/Occasion/Occasion";
import Laporan from "./views/Admin/Laporan/Laporan";
import Dashboard from "./views/Admin/Dashboard/Dashboard";
import AkunSayaForm from "./views/Admin/AkunSaya/AkunSayaForm";
import AkunSayaEdit from "./views/Admin/AkunSaya/AkunSayaEdit";
import LoginAksesTable from "./views/Admin/LoginAksesUser/LoginAksesTable";
import LoginAksesCreate from "./views/Admin/LoginAksesUser/LoginAksesCreate";
import OccasionTable from "./views/Admin/Occasion/OccasionTable";
import OccasionCreate from "./views/Admin/Occasion/OccasionCreate";
import OccasionEdit from "./views/Admin/Occasion/OccasionEdit";
import OrganizationTable from "./views/Admin/Organization/OrganizationTable";
import OrganizationCreate from "./views/Admin/Organization/OrganizationCreate";
import OrganizationEdit from "./views/Admin/Organization/OrganizationEdit";
import ProgramTable from "./views/Admin/Program/ProgramTable";
import ProgramCreate from "./views/Admin/Program/ProgramCreate";
import ProgramEdit from "./views/Admin/Program/ProgramEdit";
import Program from "./views/Admin/Program/Program";
import Activity from "./views/Admin/Activity/Activity";
import Purpose from "./views/Admin/Purpose/Purpose";
import Organization from "./views/Admin/Organization/Organization";
import ActivityTable from "./views/Admin/Activity/ActivityTable";
import ActivityCreate from "./views/Admin/Activity/ActivityCreate";
import ActivityEdit from "./views/Admin/Activity/ActivityEdit";
import PurposeTable from "./views/Admin/Purpose/PurposeTable";
import PurposeCreate from "./views/Admin/Purpose/PurposeCreate";
import PurposeEdit from "./views/Admin/Purpose/PurposeEdit";
import LoginAksesEdit from "./views/Admin/LoginAksesUser/LoginAksesEdit";
import LoginAksesDetail from "./views/Admin/LoginAksesUser/LoginAksesDetail";
import { AuthProvider } from "react-auth-kit";
import ErrorPage404 from "./views/ErrorPage404";
import UserLayout from "./layouts/UserRoot";
import OccasionDetail from "./views/Admin/Occasion/OccasionDetail";
import OrganizationDetail from "./views/Admin/Organization/OrganizationDetail";
import ToastProvider from "./context/ToastContext";
import ProgramDetail from "./views/Admin/Program/ProgramDetail";
import PurposeDetail from "./views/Admin/Purpose/PurposeDetail";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={
        <PrivateRoute loginPath="/login" role={2}>
          <UserLayout />
        </PrivateRoute>
      }
      errorElement={<ErrorPage404 />}
    />,
    <Route path="/login" element={<Login />} />,
    <Route
      path="/admin"
      loader={() => {
        return "Dashboard";
      }}
      handle={{
        crumb: (data) => (
          <Link
            to="/admin"
            className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2"
          >
            e-Monev
          </Link>
        ),
      }}
      element={
        <PrivateRoute loginPath="/login" role={1}>
          <AdminLayout />
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
            <Route index key="akunSayaForm" element={<AkunSayaForm />} />,
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
            <Route index key="loginAksesTable" element={<LoginAksesTable />} />,
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
          element={<Occasion />}
          children={[
            <Route index key="urusan" element={<OccasionTable />} />,
            <Route
              key="urusanCreate"
              path="create"
              element={<OccasionCreate />}
            />,
            <Route
              key="urusanEdit"
              path="edit/:id"
              element={<OccasionEdit />}
            />,
            <Route
              key="urusanDetail"
              path="detail/:id"
              element={<OccasionDetail />}
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
          element={<Organization />}
          children={[
            <Route index key="organisasi" element={<OrganizationTable />} />,
            <Route
              key="organisasiCreate"
              path="create"
              element={<OrganizationCreate />}
            />,
            <Route
              key="organisasiEdit"
              path="edit/:id"
              element={<OrganizationEdit />}
            />,
            <Route
              key="organisasiDetail"
              path="detail/:id"
              element={<OrganizationDetail />}
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
            <Route index key="program" element={<ProgramTable />} />,
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
            <Route
              key="programDetail"
              path="detail/:id"
              element={<ProgramDetail />}
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
          element={<Activity />}
          children={[
            <Route index key="kegiatan" element={<ActivityTable />} />,
            <Route
              key="kegiatanCreate"
              path="create"
              element={<ActivityCreate />}
            />,
            <Route
              key="kegiatanEdit"
              path="edit/:id"
              element={<ActivityEdit />}
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
          element={<Purpose />}
          children={[
            <Route index key="sasaran" element={<PurposeTable />} />,
            <Route
              key="purposeCreate"
              path="create"
              element={<PurposeCreate />}
            />,
            <Route
              key="purposeEdit"
              path="edit/:id"
              element={<PurposeEdit />}
            />,
            <Route
              key="purposeDetail"
              path="detail/:id"
              element={<PurposeDetail />}
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
