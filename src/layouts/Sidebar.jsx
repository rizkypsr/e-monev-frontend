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
import DashboardIcon from '../components/icons/DashboardIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import LockIcon from '../components/icons/LockIcon';
import CheckIcon from '../components/icons/CheckIcon';
import MedalIcon from '../components/icons/MedalIcon';
import StarIcon from '../components/icons/StarIcon';
import TargetIcon from '../components/icons/TargetIcon';
import ReportIcon from '../components/icons/ReportIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import ConfigurationIcon from '../components/icons/ConfigurationIcon';
import BookIcon from '../components/icons/BookIcon';
import AddIcon from '../components/icons/AddIcon';

const Sidebar = ({ isOpen }) => {
  const signOut = useSignOut();
  const authUser = useAuthUser();

  const getPath = (path = '') => {
    switch (authUser().role.name) {
      case 'Superadmin':
        return `/admin${path}`;
      case 'Admin Bidang':
        return `/admin-bidang${path}`;
      default:
        return path;
    }
  };

  const sidebarList = [
    {
      path: getPath(),
      label: 'Dashboard',
      icon: <DashboardIcon />,
      roles: ['superadmin', 'opd', 'admin bidang'],
    },
    {
      path: getPath('/akun-saya'),
      label: 'Akun Saya',
      icon: <ProfileIcon />,
      roles: ['superadmin', 'opd', 'admin bidang'],
    },
    {
      path: '/admin/login-akses-user',
      label: 'Login Akses User',
      icon: <LockIcon />,
      roles: ['superadmin'],
    },
    {
      path: getPath('/urusan'),
      label: 'Urusan',
      icon: <CheckIcon />,
      roles: ['superadmin', 'admin bidang'],
    },
    {
      path: '/admin/organisasi',
      label: 'Organisasi',
      icon: <MedalIcon />,
      roles: ['superadmin'],
    },
    {
      path: getPath('/program'),
      label: 'Program',
      icon: <BookIcon />,
      roles: ['superadmin', 'admin bidang'],
    },
    {
      path: getPath('/kegiatan'),
      label: 'Kegiatan',
      icon: <StarIcon />,
      roles: ['superadmin', 'admin bidang'],
    },
    {
      path: getPath('/sasaran'),
      label: 'Sasaran',
      icon: <TargetIcon />,
      roles: ['superadmin', 'admin bidang'],
    },
    {
      path: '/data-triwulan',
      label: 'Data Triwulan',
      icon: <AddIcon />,
      roles: ['opd'],
    },
    {
      path: '/data-master',
      label: 'Data Master',
      icon: <AddIcon />,
      roles: ['opd'],
    },
    {
      path: getPath('/laporan'),
      label: 'Laporan',
      icon: <ReportIcon />,
      roles: ['superadmin', 'opd', 'admin bidang'],
    },
    {
      path: '/admin/riwayat',
      label: 'Riwayat',
      icon: <ProfileIcon />,
      roles: ['superadmin'],
    },
    {
      path: '/admin/konfigurasi',
      label: 'Konfigurasi',
      icon: <ConfigurationIcon />,
      roles: ['superadmin'],
    },
  ];

  return (
    <aside
      className={`shadow-xl fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full overflow-y-auto bg-gray-300 flex flex-col">
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
              {authUser()?.role?.name}
            </span>
            <span className="text-xs">{authUser()?.username}</span>
          </div>
        </div>
        <ul className="space-y-2 px-6 font-medium leading-5">
          {sidebarList.map((sidebar) => {
            if (sidebar.roles.includes(authUser().role.name.toLowerCase())) {
              return (
                <NavLink
                  end={sidebar.label === 'Dashboard'}
                  key={sidebar.label}
                  to={sidebar.path}
                  className={({ isActive }) =>
                    [
                      'flex items-center p-2',
                      isActive ? 'text-blue-600' : 'text-black',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {sidebar.icon}
                  <span className="ml-3">{sidebar.label}</span>
                </NavLink>
              );
            }
            return null;
          })}
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
};

export default Sidebar;
