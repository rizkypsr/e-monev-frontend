import React from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

function UserLayout() {
  const signOut = useSignOut();
  const auth = useAuthUser();

  if (auth().admin_role_id !== 2) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        Halaman User <span className="font-semibold text-2xl">Coming Soon</span>
      </div>
      <button type="button" className="underline" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}

export default UserLayout;
