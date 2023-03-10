import React from "react";
import { NavLink } from "react-router-dom";
import { BookIcon } from "./icons/BookIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { DashboardIcon } from "./icons/DashboardIcon";
import { LockIcon } from "./icons/LockIcon";
import { MedalIcon } from "./icons/MedalIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import { ReportIcon } from "./icons/ReportIcon";
import { StarIcon } from "./icons/StarIcon";
import { TargetIcon } from "./icons/TargetIcon";
import Logo from "../assets/images/big_logo.png";
import { LogoutIcon } from "./icons/LogoutIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "./DialogContent";
import LogoutImg from "../assets/images/logout.png";
import Button from "./Button";
import { useAuthUser, useSignOut } from "react-auth-kit";

function Sidebar() {
  const signOut = useSignOut();
  const authUser = useAuthUser();

  return (
    <aside className="shadow-xl fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0">
      <div className="h-full overflow-y-auto bg-white flex flex-col">
        <a
          href="/"
          className="flex items-center pl-4 py-5 border-b border-gray-20">
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
        <div className="flex items-center pl-4 py-5">
          <img
            src="https://images.pexels.com/photos/4336061/pexels-photo-4336061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="object-cover mr-4 rounded-full h-9 w-9"
            alt="Profil"
          />
          <div className="flex flex-col">
            <span className="font-semibold whitespace-nowrap">
              {authUser().admin_role_id === 1 ? "Super Admin" : "User OPD"}
            </span>
            <span className="text-xs">{authUser().name}</span>
          </div>
        </div>
        <ul className="space-y-2 px-3 font-medium leading-5">
          <NavLink
            end
            to="/admin"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <DashboardIcon />
            <span className="ml-3">Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/akun-saya"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <ProfileIcon />
            <span className="ml-3"> Akun Saya</span>
          </NavLink>
          <NavLink
            to="/admin/login-akses-user"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <LockIcon />

            <span className="ml-3">Login Akses User</span>
          </NavLink>
          <NavLink
            to="/admin/urusan"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <CheckIcon />
            <span className="ml-3">Urusan</span>
          </NavLink>
          <NavLink
            to="/admin/organisasi"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <MedalIcon />
            <span className="ml-3">Organisasi</span>
          </NavLink>
          <NavLink
            to="/admin/program"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <BookIcon />
            <span className="ml-3">Program</span>
          </NavLink>
          <NavLink
            to="/admin/kegiatan"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <StarIcon />
            <span className="ml-3">Kegiatan</span>
          </NavLink>
          <NavLink
            to="/admin/sasaran"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <TargetIcon />
            <span className="ml-3">Sasaran</span>
          </NavLink>
          <NavLink
            to="/admin/laporan"
            className={({ isActive }) => {
              return [
                "flex items-center p-2",
                isActive ? "text-blue-600" : "text-black",
              ]
                .filter(Boolean)
                .join(" ");
            }}>
            <ReportIcon />
            <span className="ml-3">Data Laporan</span>
          </NavLink>
        </ul>
        <Dialog>
          <DialogContent className="py-12">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-6 bg-[#FFDADA] w-fit rounded-lg">
                <img src={LogoutImg} />
              </div>

              <div>
                <h1 className="mt-6 font-semibold text-lg leading-7 text-dark-gray">
                  Apakah Anda yakin keluar Dashboard ini?
                </h1>
                <div className="flex space-x-3 justify-center">
                  <DialogClose>
                    <Button
                      onClick={() => signOut()}
                      className="w-full md:w-28 mt-8 border border-[#EB5757]"
                      type="modal"
                      background="bg-white"
                      textColor="text-[#EB5757]">
                      Ya, keluar
                    </Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      className="w-full md:w-28 mt-8"
                      type="modal"
                      background="bg-primary"
                      textColor="text-white">
                      Batal
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogTrigger>
            <div className="flex items-center px-5 py-5 border-t border-gray-20 mt-3 text-light-gray">
              <LogoutIcon />
              <span className="ml-3">Keluar</span>
            </div>
          </DialogTrigger>
        </Dialog>
        <div className="text-center border-t py-5 border-gray-200 mt-auto text-light-gray text-sm">
          <div className="font-semibold">&#169;2023 BAPPEDA</div>
          <div>KAB. SORONG</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
