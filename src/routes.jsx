import React from "react";
import { RequireAuth } from "react-auth-kit";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminRoot";
import Dashboard from "./views/Admin/Dashboard/Dashboard";
import Login from "./views/Auth/Login";
import PrivateRoute from "./layouts/PrivateRoute";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/login"}
          element={<Login />}
        />
        <Route
          path={"/admin"}
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
          element={<PrivateRoute Component={AdminLayout} />}
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
          ]}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
