import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
} from 'react-router-dom';
import Login from './views/Auth/Login';
import PrivateRoute from './layouts/PrivateRoute';
import AdminLayout from './layouts/AdminRoot';
import MyAccount from './views/Admin/MyAccount/MyAccount';
import LoginAksesUser from './views/Admin/UserAccess/UserAccess';
import Report from './views/Admin/Report/Report';
import Dashboard from './views/shared/Dashboard/Dashboard';
import UserAccessTable from './views/Admin/UserAccess/UserAccessTable';
import LoginAksesCreate from './views/Admin/UserAccess/LoginAksesCreate';
import OrganizationTable from './views/Admin/Organization/OrganizationTable';
import OrganizationCreate from './views/Admin/Organization/OrganizationCreate';
import OrganizationEdit from './views/Admin/Organization/OrganizationEdit';
import ProgramTable from './views/Admin/Program/ProgramTable';
import ProgramCreate from './views/Admin/Program/ProgramCreate';
import ProgramEdit from './views/Admin/Program/ProgramEdit';
import Program from './views/Admin/Program/Program';
import Activity from './views/Admin/Activity/Activity';
import Purpose from './views/Admin/Purpose/Purpose';
import Organization from './views/Admin/Organization/Organization';
import ActivityTable from './views/Admin/Activity/ActivityTable';
import ActivityCreate from './views/Admin/Activity/ActivityCreate';
import ActivityEdit from './views/Admin/Activity/ActivityEdit';
import PurposeTable from './views/Admin/Purpose/PurposeTable';
import PurposeCreate from './views/Admin/Purpose/PurposeCreate';
import PurposeEdit from './views/Admin/Purpose/PurposeEdit';
import LoginAksesDetail from './views/Admin/UserAccess/LoginAksesDetail';
import ErrorPage404 from './views/ErrorPage404';
import UserLayout from './layouts/UserRoot';
import OrganizationDetail from './views/Admin/Organization/OrganizationDetail';
import ProgramDetail from './views/Admin/Program/ProgramDetail';
import PurposeDetail from './views/Admin/Purpose/PurposeDetail';
import ActivityDetail from './views/Admin/Activity/ActivityDetail';
import LoginAksesEdit from './views/Admin/UserAccess/LoginAksesEdit';
import ReportTable from './views/Admin/Report/ReportTable';
import ReportDetail from './views/Admin/Report/ReportDetail';
import ReportEdit from './views/Admin/Report/ReportEdit';
import MyAccountForm from './views/Admin/MyAccount/MyAccountForm';
import Master from './views/User/Master/Master';
import MasterCreate from './views/User/Master/MasterCreate';
import TriwulanCreate from './views/User/Triwulan/TriwulanCreate';
import Occasion from './views/Admin/occasion/Occasion';
import OccasionTable from './views/Admin/occasion/OccasionTable';
import OccasionCreate from './views/Admin/occasion/OccasionCreate';
import OccasionEdit from './views/Admin/occasion/OccasionEdit';
import OccasionDetail from './views/Admin/occasion/OccasionDetail';
import ReportPreview from './views/shared/report/ReportPreview';
import Configuration from './views/Admin/Configuration/Configuration';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/login" element={<Login />} />,
    <Route
      path="/"
      loader={() => 'Dashboard'}
      handle={{
        crumb: () => (
          <Link
            to="/"
            className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2"
          >
            e-Montir
          </Link>
        ),
      }}
      element={
        <PrivateRoute>
          <UserLayout />
        </PrivateRoute>
      }
      errorElement={<ErrorPage404 />}
    >
      <Route
        index
        key="userDashboard"
        loader={() => 'Dashboard'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Dashboard />}
      />
      <Route
        key="myAccount"
        path="akun-saya"
        loader={() => 'Akun Saya'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<MyAccount />}
      >
        <Route index key="akunSayaForm" element={<MyAccountForm />} />
      </Route>
      <Route
        key="report"
        path="laporan"
        loader={() => 'Data Laporan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Report />}
      >
        <Route index key="reportTable" element={<ReportTable />} />
        <Route key="reportEdit" path="edit/:id" element={<ReportEdit />} />
        <Route
          key="reportDetail"
          path="detail/:id"
          element={<ReportDetail />}
        />
        <Route
          key="userReportPreview"
          path="preview"
          element={<ReportPreview />}
        />
      </Route>
      <Route
        key="master"
        path="data-master"
        loader={() => 'Tambah Data Master'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Master />}
      >
        <Route index key="masterCreate" element={<MasterCreate />} />
      </Route>
      <Route
        key="triwulan"
        path="data-triwulan"
        loader={() => 'Tambah Data Triwulan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Master />}
      >
        <Route index key="triwulanCreate" element={<TriwulanCreate />} />
      </Route>
    </Route>,
    <Route
      path="/admin"
      loader={() => 'Dashboard'}
      handle={{
        crumb: () => (
          <Link
            to="/admin"
            className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2"
          >
            e-Montir
          </Link>
        ),
      }}
      element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      }
    >
      <Route
        index
        key="adminDashboard"
        loader={() => 'Dashboard'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Dashboard />}
      />
      <Route
        key="myAccount"
        path="akun-saya"
        loader={() => 'Akun Saya'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<MyAccount />}
      >
        <Route index key="akunSayaForm" element={<MyAccountForm />} />
      </Route>
      <Route
        key="loginAksesUser"
        path="login-akses-user"
        loader={() => 'Login Akses User'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<LoginAksesUser />}
      >
        <Route index key="loginAksesTable" element={<UserAccessTable />} />
        <Route
          key="loginAksesCreate"
          path="create"
          element={<LoginAksesCreate />}
        />
        <Route
          key="loginAksesEdit"
          path="edit/:id"
          element={<LoginAksesEdit />}
        />
        <Route
          key="loginAksesDetail"
          path="detail/:id"
          element={<LoginAksesDetail />}
        />
      </Route>
      <Route
        key="urusan"
        path="urusan"
        loader={() => 'Urusan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Occasion />}
      >
        <Route index key="urusan" element={<OccasionTable />} />
        <Route key="urusanCreate" path="create" element={<OccasionCreate />} />
        <Route key="urusanEdit" path="edit/:id" element={<OccasionEdit />} />
        <Route
          key="urusanDetail"
          path="detail/:id"
          element={<OccasionDetail />}
        />
      </Route>
      <Route
        key="organisasi"
        path="organisasi"
        loader={() => 'Organisasi'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Organization />}
      >
        <Route index key="organisasi" element={<OrganizationTable />} />
        <Route
          key="organisasiCreate"
          path="create"
          element={<OrganizationCreate />}
        />
        <Route
          key="organisasiEdit"
          path="edit/:id"
          element={<OrganizationEdit />}
        />
        <Route
          key="organisasiDetail"
          path="detail/:id"
          element={<OrganizationDetail />}
        />
      </Route>
      ,
      <Route
        key="program"
        path="program"
        loader={() => 'Program'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Program />}
      >
        <Route index key="program" element={<ProgramTable />} />
        <Route key="programCreate" path="create" element={<ProgramCreate />} />
        <Route key="programEdit" path="edit/:id" element={<ProgramEdit />} />
        <Route
          key="programDetail"
          path="detail/:id"
          element={<ProgramDetail />}
        />
      </Route>
      ,
      <Route
        key="kegiatan"
        path="kegiatan"
        loader={() => 'Kegiatan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Activity />}
      >
        <Route index key="kegiatan" element={<ActivityTable />} />
        <Route
          key="kegiatanCreate"
          path="create"
          element={<ActivityCreate />}
        />
        <Route key="kegiatanEdit" path="edit/:id" element={<ActivityEdit />} />
        <Route
          key="kegiatanDetail"
          path="detail/:id"
          element={<ActivityDetail />}
        />
      </Route>
      <Route
        key="purpose"
        path="sasaran"
        loader={() => 'Sasaran'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Purpose />}
      >
        <Route index key="purpose" element={<PurposeTable />} />
        <Route key="purposeCreate" path="create" element={<PurposeCreate />} />
        <Route key="purposeEdit" path="edit/:id" element={<PurposeEdit />} />
        <Route
          key="purposeDetail"
          path="detail/:id"
          element={<PurposeDetail />}
        />
      </Route>
      <Route
        key="report"
        path="laporan"
        loader={() => 'Data Laporan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm text-dark-gray md:ml-2">{data}</span>
          ),
        }}
        element={<Report />}
      >
        <Route index key="reportTable" element={<ReportTable />} />
        <Route key="reportEdit" path="edit/:id" element={<ReportEdit />} />
        <Route
          key="reportDetail"
          path="detail/:id"
          element={<ReportDetail />}
        />
        <Route
          key="adminReportPreview"
          path="preview"
          element={<ReportPreview />}
        />
      </Route>
      <Route
        key="configuration"
        path="konfigurasi"
        element={<Configuration />}
      />
    </Route>,
  ]),
  {
    basename: '/',
  }
);

export default router;
