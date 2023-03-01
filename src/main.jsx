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
import Organisasi from "./admin/routes/Organisasi";
import Program from "./admin/routes/Program";
import Kegiatan from "./admin/routes/Kegiatan";
import Sasaran from "./admin/routes/Sasaran";
import Laporan from "./views/Admin/Laporan/Laporan";
import Dashboard from "./views/Admin/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/admin/login"
      element={<Login />}
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
        <PrivateRoute roles={"admin"}>
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
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
