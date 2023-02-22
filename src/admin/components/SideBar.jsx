import React from "react";
import { ReactComponent as DashboardLogo } from "../../assets/icons/dashboard.svg";
import { ReactComponent as UserLogo } from "../../assets/icons/user.svg";
import { ReactComponent as LockLogo } from "../../assets/icons/lock.svg";
import { ReactComponent as ChecklistLogo } from "../../assets/icons/checklist.svg";
import { ReactComponent as MedalLogo } from "../../assets/icons/medal.svg";
import { ReactComponent as BookLogo } from "../../assets/icons/book.svg";
import { ReactComponent as StarLogo } from "../../assets/icons/star.svg";
import { ReactComponent as TargetLogo } from "../../assets/icons/target.svg";
import { ReactComponent as NoteLogo } from "../../assets/icons/note.svg";
import { ReactComponent as LogoutLogo } from "../../assets/icons/logout.svg";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-1/6 drop-shadow-xl bg-white">
      <aside className="fixed top-0 left-0 z-40 w-full h-screen">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a
            href="/"
            className="flex items-center pl-2.5 mb-5 pb-5 border-b border-gray-20">
            <img
              src={Logo}
              className="h-12 mr-4 sm:h-9"
              alt="E-Monev Logo"
            />
            <div className="flex flex-col">
              <span className="font-semibold whitespace-nowrap">E-MONEV</span>
              <span className="text-xs">KABUPATEN SORONG</span>
            </div>
          </a>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center pl-2.5 mb-5">
                <img
                  src="https://images.pexels.com/photos/4336061/pexels-photo-4336061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="h-9 w-9 rounded-full object-cover mr-4"
                  alt="Profil"
                />
                <div className="flex flex-col">
                  <span className="font-semibold whitespace-nowrap">
                    Super Admin
                  </span>
                  <span className="text-xs">Nama OPD</span>
                </div>
              </div>
            </li>
            <li>
              <Link
                to={"/admin"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <DashboardLogo />
                <span className="ml-3 text-primary font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"akun-saya"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <UserLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Akun Saya
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"login-akses-user"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <LockLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Login Akses User
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"urusan"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <ChecklistLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Urusan
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"organisasi"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <MedalLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Organisasi
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"program"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <BookLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Program
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"kegiatan"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <StarLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Kegiatan
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"sasaran"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <TargetLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Sasaran
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"data-laporan"}
                className="flex items-center p-2 rounded-lg hover:bg-cotton-ball">
                <NoteLogo />
                <span className="flex-1 ml-3 text-dark-gray whitespace-nowrap">
                  Data Laporan
                </span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <LogoutLogo />
                <span className="ml-4">Keluar</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
