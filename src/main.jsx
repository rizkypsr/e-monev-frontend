import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Admin from "./admin/Admin";
import Dashboard from "./admin/routes/Dashboard";
import AkunSaya from "./admin/routes/AkunSaya/AkunSaya";
import AkunSayaEdit from "./admin/routes/AkunSaya/AkunSayaEdit";
import AkunSayaForm from "./admin/routes/AkunSaya/AkunSayaForm";
import LoginAksesUser from "./admin/routes/LoginAksesUser/LoginAksesUser";
import LoginAksesUserTable from "./admin/routes/LoginAksesUser/LoginAksesUserTable";
import LoginAksesUserCreate from "./admin/routes/LoginAksesUser/LoginAksesUserCreate";
import Urusan from "./admin/routes/Urusan";
import Organisasi from "./admin/routes/Organisasi";
import Program from "./admin/routes/Program";
import Kegiatan from "./admin/routes/Kegiatan";
import Sasaran from "./admin/routes/Sasaran";
import DataLaporan from "./admin/routes/DataLaporan";
import "./index.css";
import Login from "./admin/routes/Login/Login";
import { Root } from "@radix-ui/react-popover";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    handle: {
      crumb: () => (
        <Link
          to="/admin"
          className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2">
          e-Monev
        </Link>
      ),
    },
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: () => {
          return "Dashboard";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "akun-saya",
        element: <AkunSaya />,
        loader: () => {
          return "Akun Saya";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
        children: [
          {
            index: true,
            element: <AkunSayaForm />,
          },
          {
            path: "edit",
            element: <AkunSayaEdit />,
          },
        ],
      },
      {
        path: "login-akses-user",
        element: <LoginAksesUser />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "urusan",
        element: <Urusan />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "organisasi",
        element: <Organisasi />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "program",
        element: <Program />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "kegiatan",
        element: <Kegiatan />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "sasaran",
        element: <Sasaran />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
      {
        path: "data-laporan",
        element: <DataLaporan />,
        loader: () => {
          return "Login Akses User";
        },
        handle: {
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        },
      },
    ],
  },
]);

// const routers = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route
//     //   path="/admin"
//     //   element={<Admin />}
//     //   handle={{
//     //     crumb: () => (
//     //       <Link
//     //         to="/admin"
//     //         className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2">
//     //         e-Monev
//     //       </Link>
//     //     ),
//     //   }}>
//     //   <Route
//     //     index
//     //     element={<Dashboard />}
//     //     loader={() => {
//     //       return "Dashboard";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="akun-saya"
//     //     element={<AkunSaya />}
//     //     loader={() => {
//     //       return "Akun Saya";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}>
//     //     <Route
//     //       index
//     //       element={<AkunSayaForm />}
//     //     />
//     //     <Route
//     //       path="edit"
//     //       element={<AkunSayaEdit />}
//     //     />
//     //   </Route>
//     //   <Route
//     //     path="login-akses-user"
//     //     element={<LoginAksesUser />}
//     //     loader={() => {
//     //       return "Login Akses User";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}>
//     //     <Route
//     //       index
//     //       element={<LoginAksesUserTable />}
//     //     />
//     //     <Route
//     //       path="create"
//     //       element={<LoginAksesUserCreate />}
//     //     />
//     //   </Route>
//     //   <Route
//     //     path="urusan"
//     //     element={<Urusan />}
//     //     loader={() => {
//     //       return "Urusan";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="organisasi"
//     //     element={<Organisasi />}
//     //     loader={() => {
//     //       return "Organisasi";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="program"
//     //     element={<Program />}
//     //     loader={() => {
//     //       return "Program";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="kegiatan"
//     //     element={<Kegiatan />}
//     //     loader={() => {
//     //       return "Kegiatan";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="Sasaran"
//     //     element={<Sasaran />}
//     //     loader={() => {
//     //       return "Organisasi";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     //   <Route
//     //     path="data-laporan"
//     //     element={<DataLaporan />}
//     //     loader={() => {
//     //       return "Data Laporan";
//     //     }}
//     //     handle={{
//     //       crumb: (data) => (
//     //         <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
//     //       ),
//     //     }}
//     //   />
//     // </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
