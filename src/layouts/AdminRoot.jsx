import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="h-screen">
      <button
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm md:hidden focus:outline-none"
        type="button">
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <Sidebar />
      <div className="bg-[#F3F6FF] md:ml-64 min-h-screen">
        <header className="px-8 py-4 bg-white">
          <Breadcrumb />
        </header>
        <main className="p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
