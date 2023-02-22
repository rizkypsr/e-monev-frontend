import React from "react";

function Dashboard() {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-8">
        Halo Admin, selamat datang di halaman elektronik aplikasi&nbsp;
        <span className="italic">e-Monev</span>
      </h1>

      <div className="bg-white rounded-lg drop-shadow-sm grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-8">
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#56CCF2" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">URUSAN</h3>
          </div>
        </div>
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#BB6BD9" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">ORGANISASI</h3>
          </div>
        </div>
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#6FCF97" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">PROGRAM</h3>
          </div>
        </div>
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#F2C94C" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">KEGIATAN</h3>
          </div>
        </div>
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#F2C94C" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">SASARAN</h3>
          </div>
        </div>
        <div className="w-60 h-20 bg-white drop-shadow-md p-4 flex space-x-4 rounded-lg">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#BDBDBD" }}></div>
          <div>
            <h2 className="font-semibold text-lg">28</h2>
            <h3 className="text-sm">LOGIN AKSES USER</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
