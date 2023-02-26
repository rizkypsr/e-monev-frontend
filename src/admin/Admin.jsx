import { Outlet } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import SideBar from "./components/SideBar";

function Admin() {
  return (
    <div className="flex h-screen bg-cotton-ball">
      <SideBar />

      <div className="flex flex-col flex-1">
        <header className="px-8 py-4 bg-white">
          <Breadcrumb />
        </header>
        <main className="flex-1 max-h-screen p-8 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;
