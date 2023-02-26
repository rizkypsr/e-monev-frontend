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
import { Link, NavLink } from "react-router-dom";

function SideBar() {
  const activeClass =
    "flex items-center p-2 rounded-lg hover:bg-cotton-ball text-primary";
  const inActiveClass =
    "flex items-center p-2 rounded-lg hover:bg-cotton-ball text-dark-gray";

  return (
    <div className="w-1/6 bg-white drop-shadow-xl">
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
                  className="object-cover mr-4 rounded-full h-9 w-9"
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
              <NavLink
                end
                to="/admin"
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <DashboardLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"akun-saya"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <UserLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">Akun Saya</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"login-akses-user"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <LockLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Login Akses User
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"urusan"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <ChecklistLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Urusan
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"organisasi"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <MedalLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Organisasi
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"program"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <BookLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Program
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"kegiatan"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <StarLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Kegiatan
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"sasaran"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <TargetLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Sasaran
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"data-laporan"}
                className={({ isActive }) =>
                  isActive ? activeClass : inActiveClass
                }>
                <NoteLogo />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Data Laporan
                </span>
              </NavLink>
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
