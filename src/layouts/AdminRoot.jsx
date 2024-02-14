import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { useMediaQuery } from 'react-responsive';
import Breadcrumb from '../components/Breadcrumb';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const auth = useAuthUser();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const [sidebarVisible, setSidebarVisible] = useState(isDesktopOrLaptop);

  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    if (isTabletOrMobile) {
      setSidebarVisible(false);
    } else {
      setSidebarVisible(true);
    }
  }, [isTabletOrMobile]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target) &&
        isTabletOrMobile
      ) {
        setSidebarVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTabletOrMobile]);

  const toggleSidebar = () => {
    if (isTabletOrMobile) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  const handleMenuClick = () => {
    if (isTabletOrMobile) {
      setSidebarVisible(false);
    }
  };

  if (auth().role.name === 'OPD') {
    return <Navigate to="/" replace />;
  }

  if (auth().role.name === 'Admin Bidang') {
    return <Navigate to="/admin-bidang" replace />;
  }

  return (
    <div className="h-screen">
      <div className="flex justify-end">
        <button
          ref={hamburgerRef}
          className="hamburger-menu inline-flex items-center p-2 mt-2 ml-3 text-sm md:hidden focus:outline-none"
          type="button"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      </div>

      <div ref={sidebarRef}>
        <Sidebar isOpen={sidebarVisible} onHide={handleMenuClick} />
      </div>
      <div className="bg-[#F3F6FF] md:ml-64 min-h-screen">
        <header className="px-8 py-4 bg-gray-300">
          <Breadcrumb />
        </header>
        <main className="p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
