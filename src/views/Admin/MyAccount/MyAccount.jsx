import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MyAccount() {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">Akun Saya</h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <Outlet />
      </div>
    </>
  );
}