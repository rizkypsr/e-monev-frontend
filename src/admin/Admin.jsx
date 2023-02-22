import { Outlet } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import SideBar from "./components/SideBar";

function Admin() {
  return (
    <div className="flex h-screen bg-cotton-ball">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <header className="px-8 py-4 bg-white">
          <Breadcrumb />
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;
