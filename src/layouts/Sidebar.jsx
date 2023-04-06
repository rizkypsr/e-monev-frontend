import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import Logo from '../assets/images/big_logo.png';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../components/DialogContent';
import LogoutImg from '../assets/images/logout.png';
import Button from '../components/Button';
import { AddIcon, BookIcon } from '../components/icons';
import DashboardIcon from '../components/icons/DashboardIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import LockIcon from '../components/icons/LockIcon';
import CheckIcon from '../components/icons/CheckIcon';
import MedalIcon from '../components/icons/MedalIcon';
import StarIcon from '../components/icons/StarIcon';
import TargetIcon from '../components/icons/TargetIcon';
import ReportIcon from '../components/icons/ReportIcon';
import LogoutIcon from '../components/icons/LogoutIcon';

function Sidebar() {
  const signOut = useSignOut();
  const authUser = useAuthUser();

  return (
    <aside className="shadow-xl fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0">
      <div className="h-full overflow-y-auto bg-white flex flex-col">
        <a
          href="/"
          className="flex items-center pl-4 py-5 border-b border-gray-20"
        >
          <img src={Logo} className="h-12 mr-4 sm:h-9" alt="E-Monev Logo" />
          <div className="flex flex-col">
            <span className="font-semibold whitespace-nowrap">
              E-MONTIR PEMDA
            </span>
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
              {authUser().admin_role_id === 1 ? 'Super Admin' : 'User OPD'}
            </span>
            <span className="text-xs">{authUser().name}</span>
          </div>
        </div>
        <ul className="space-y-2 px-3 font-medium leading-5">
          <NavLink
            end
            to={authUser().admin_role_id === 1 ? '/admin' : '/'}
            className={({ isActive }) =>
              [
                'flex items-center p-2',
                isActive ? 'text-blue-600' : 'text-black',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <DashboardIcon />
            <span className="ml-3">Dashboard</span>
          </NavLink>
          <NavLink
            to={
              authUser().admin_role_id === 1 ? '/admin/akun-saya' : '/akun-saya'
            }
            className={({ isActive }) =>
              [
                'flex items-center p-2',
                isActive ? 'text-blue-600' : 'text-black',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <ProfileIcon />
            <span className="ml-3"> Akun Saya</span>
          </NavLink>
          {authUser().admin_role_id === 1 && (
            <>
              <NavLink
                to="/admin/login-akses-user"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <LockIcon />
                <span className="ml-3">Login Akses User</span>
              </NavLink>
              <NavLink
                to="/admin/urusan"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <CheckIcon />
                <span className="ml-3">Urusan</span>
              </NavLink>
              <NavLink
                to="/admin/organisasi"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <MedalIcon />
                <span className="ml-3">Organisasi</span>
              </NavLink>
              <NavLink
                to="/admin/program"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <BookIcon />
                <span className="ml-3">Program</span>
              </NavLink>
              <NavLink
                to="/admin/kegiatan"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <StarIcon />
                <span className="ml-3">Kegiatan</span>
              </NavLink>
              <NavLink
                to="/admin/sasaran"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <TargetIcon />
                <span className="ml-3">Sasaran</span>
              </NavLink>
            </>
          )}
          {authUser().admin_role_id === 2 && (
            <>
              <NavLink
                to="/triwulan"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <AddIcon />
                <span className="ml-3">Tambah Data Triwulan</span>
              </NavLink>
              <NavLink
                to="/master"
                className={({ isActive }) =>
                  [
                    'flex items-center p-2',
                    isActive ? 'text-blue-600' : 'text-black',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <AddIcon />
                <span className="ml-3">Tambah Data Master</span>
              </NavLink>
            </>
          )}
          <NavLink
            to={authUser().admin_role_id === 1 ? '/admin/laporan' : '/laporan'}
            className={({ isActive }) =>
              [
                'flex items-center p-2',
                isActive ? 'text-blue-600' : 'text-black',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <ReportIcon />
            <span className="ml-3">Data Laporan</span>
          </NavLink>
        </ul>
        <Dialog>
          <DialogContent className="py-12">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-6 bg-[#FFDADA] w-fit rounded-lg">
                <img src={LogoutImg} alt="Logout" />
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
                      textColor="text-[#EB5757]"
                    >
                      Ya, keluar
                    </Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      className="w-full md:w-28 mt-8"
                      type="modal"
                      background="bg-primary"
                      textColor="text-white"
                    >
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
