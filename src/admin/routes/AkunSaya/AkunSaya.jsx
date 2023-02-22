import React from "react";
import { Outlet } from "react-router-dom";

function AkunSaya() {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">Akun Saya</h1>

      <div className="bg-white rounded-lg drop-shadow-sm grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-8">
        <Outlet />
      </div>
    </>
  );
}

export default AkunSaya;
