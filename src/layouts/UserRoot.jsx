import React from "react";
import { useSignOut } from "react-auth-kit";

function UserLayout() {
  const signOut = useSignOut();

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
