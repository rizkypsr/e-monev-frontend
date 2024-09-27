import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
} from 'react-router-dom';
import Login from './views/Auth/Login';
import MyAccount from './views/Admin/MyAccount/MyAccount';
import LoginAksesUser from './views/Admin/UserAccess/UserAccess';
import Report from './views/Admin/Report/Report';
import Dashboard from './views/shared/Dashboard/Dashboard';
import UserAccessTable from './views/Admin/UserAccess/UserAccessTable';
import UserAccessCreate from './views/Admin/UserAccess/UserAccessCreate';
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
import UserAccessDetail from './views/Admin/UserAccess/UserAccessDetail';
import OrganizationDetail from './views/Admin/Organization/OrganizationDetail';
import ProgramDetail from './views/Admin/Program/ProgramDetail';
import PurposeDetail from './views/Admin/Purpose/PurposeDetail';
import ActivityDetail from './views/Admin/Activity/ActivityDetail';
import UserAccessEdit from './views/Admin/UserAccess/UserAccessEdit';
import ReportTable from './views/Admin/Report/ReportTable';
import ReportDetail from './views/Admin/Report/ReportDetail';
import ReportEdit from './views/Admin/Report/ReportEdit';
import MyAccountForm from './views/Admin/MyAccount/MyAccountForm';
import Master from './views/User/Master/Master';
import MasterCreate from './views/User/Master/MasterCreate';
import TriwulanCreate from './views/User/Triwulan/TriwulanCreate';
import Occassion from './views/Admin/Occassion/Occassion';
import OccassionTable from './views/Admin/Occassion/OccassionTable';
import OccasionCreate from './views/Admin/Occassion/OccassionCreate';
import OccassionEdit from './views/Admin/Occassion/OccassionEdit';
import OccassionDetail from './views/Admin/Occassion/OccassionDetail';
import Configuration from './views/Admin/Configuration/Configuration';
import ReportMasterTable from './views/Admin/Report/ReportMasterTable';
import ReportTriwulanTable from './views/Admin/Report/ReportTriwulanTable';
import ReportTableWrapper from './views/Admin/Report/ReportTableWrapper';
import ForgotPassword from './views/Auth/ForgotPassword';
import History from './views/Admin/History/History';
import HistoryTable from './views/Admin/History/HistoryTable';
import ReportTriwulanDetail from './views/Admin/Report/ReportTriwulanDetail';
import TriwulanEdit from './views/User/Triwulan/TriwulanEdit';
import ReportMasterDetail from './views/Admin/Report/ReportMasterDetail';
import Authorization from './components/Authorization';
import PrivateLayout from './layouts/PrivateLayout';
import MasterEdit from './views/User/Master/MasterEdit';
import FundSourceTable from './views/Admin/FundSource/FundSourceTable';
import FundSource from './views/Admin/FundSource/FundSource';
import FundSourceCreate from './views/Admin/FundSource/FundSourceCreate';
import FundSourceEdit from './views/Admin/FundSource/FundSourceEdit';
import FundSourceDetail from './views/Admin/FundSource/FundSourceDetail';
import Location from './views/shared/Location/Location';
import ErrorPage404 from './views/ErrorPage404';
import TriwulanForm from './views/User/Triwulan/TriwulanForm';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/login" element={<Login />} />,
    <Route path="/forgot-password" element={<ForgotPassword />} />,
    <Route
      path="/"
      element={<PrivateLayout />}
      loader={() => 'Dashboard'}
      handle={{
        crumb: () => (
          <Link
            to="/"
            className="ml-1 text-sm hover:text-primary md:ml-2 text-white"
          >
            e-Montir
          </Link>
        ),
      }}
      errorElement={<ErrorPage404 />}
    >
      <Route
        index
        key="dashboard"
        loader={() => 'Dashboard'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'OPD', 'Admin Bidang']}>
            <Dashboard />
          </Authorization>
        }
      />
      <Route
        key="myAccount"
        path="akun-saya"
        loader={() => 'Akun Saya'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'OPD', 'Admin Bidang']}>
            <MyAccount />
          </Authorization>
        }
      >
        <Route index key="akunSayaForm" element={<MyAccountForm />} />
      </Route>
      <Route
        key="loginAksesUser"
        path="login-akses-user"
        loader={() => 'Login Akses User'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin']}>
            <LoginAksesUser />
          </Authorization>
        }
      >
        <Route index key="loginAksesTable" element={<UserAccessTable />} />
        <Route
          key="loginAksesCreate"
          path="create"
          element={<UserAccessCreate />}
        />
        <Route
          key="loginAksesEdit"
          path="edit/:id"
          element={<UserAccessEdit />}
        />
        <Route
          key="loginAksesDetail"
          path="detail/:id"
          element={<UserAccessDetail />}
        />
      </Route>
      <Route
        key="urusan"
        path="urusan"
        loader={() => 'Urusan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'Admin Bidang']}>
            <Occassion />
          </Authorization>
        }
      >
        <Route index key="urusan" element={<OccassionTable />} />
        <Route key="urusanCreate" path="create" element={<OccasionCreate />} />
        <Route key="urusanEdit" path="edit/:id" element={<OccassionEdit />} />
        <Route
          key="urusanDetail"
          path="detail/:id"
          element={<OccassionDetail />}
        />
      </Route>
      <Route
        key="sumberDana"
        path="sumber-dana"
        loader={() => 'Sumber Dana'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin']}>
            <FundSource />
          </Authorization>
        }
      >
        <Route index key="sumberDanaTable" element={<FundSourceTable />} />
        <Route
          key="sumberDanaCreate"
          path="create"
          element={<FundSourceCreate />}
        />
        <Route
          key="sumberDanaEdit"
          path="edit/:id"
          element={<FundSourceEdit />}
        />
        <Route
          key="sumberDanaDetail"
          path="detail/:id"
          element={<FundSourceDetail />}
        />
      </Route>
      <Route
        key="organisasi"
        path="organisasi"
        loader={() => 'Organisasi'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin']}>
            <Organization />
          </Authorization>
        }
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
      <Route
        key="program"
        path="program"
        loader={() => 'Program'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'Admin Bidang']}>
            <Program />
          </Authorization>
        }
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
      <Route
        key="kegiatan"
        path="kegiatan"
        loader={() => 'Kegiatan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'Admin Bidang']}>
            <Activity />
          </Authorization>
        }
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
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin', 'Admin Bidang']}>
            <Purpose />
          </Authorization>
        }
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
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization
            roles={['Superadmin', 'OPD', 'Admin Bidang', 'Atasan Daerah']}
          >
            <Report />
          </Authorization>
        }
      >
        <Route path="" key="report" element={<ReportTableWrapper />}>
          <Route key="reportTable" path="" element={<ReportTable />} />
          <Route
            key="reportMasterTable"
            path="data-master"
            element={<ReportMasterTable />}
          />
          <Route
            key="reportTriwulanTable"
            path="data-triwulan"
            element={<ReportTriwulanTable />}
          />
        </Route>
        <Route
          key="reportEdit"
          path="edit/:id"
          element={
            <Authorization roles={['Superadmin']}>
              <ReportEdit />
            </Authorization>
          }
        />
        <Route
          key="reportMasterEdit"
          path="data-master/edit/:id"
          element={
            <Authorization roles={['Superadmin', 'OPD']}>
              <MasterEdit />
            </Authorization>
          }
        />
        <Route
          key="reportTriwulanEdit"
          path="data-triwulan/edit/:id"
          element={<TriwulanEdit />}
        />
        <Route
          key="reportTriwulanDetail"
          path="data-triwulan/detail/:id"
          element={<ReportTriwulanDetail />}
        />
        <Route
          key="reportMasterDetail"
          path="data-master/detail/:id"
          element={<ReportMasterDetail />}
        />
        <Route
          key="reportDetail"
          path="detail/:id"
          element={<ReportDetail />}
        />
      </Route>
      <Route
        key="configuration"
        path="konfigurasi"
        element={
          <Authorization roles={['Superadmin']}>
            <Configuration />
          </Authorization>
        }
      />
      <Route
        key="history"
        path="riwayat"
        loader={() => 'Riwayat'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['Superadmin']}>
            <History />
          </Authorization>
        }
      >
        <Route index key="history" element={<HistoryTable />} />
      </Route>
      <Route
        key="master"
        path="data-master"
        loader={() => 'Tambah Data Master'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['OPD']}>
            <Master />
          </Authorization>
        }
      >
        <Route index key="masterCreate" element={<MasterCreate />} />
      </Route>
      <Route
        key="triwulan"
        path="data-triwulan/:id?"
        loader={() => 'Tambah Data Kegiatan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['OPD', 'Superadmin']}>
            <TriwulanForm />
          </Authorization>
        }
      />
      <Route
        key="location"
        path="lokasi"
        loader={() => 'Lokasi Kegiatan'}
        handle={{
          crumb: (data) => (
            <span className="ml-1 text-sm md:ml-2 text-white">{data}</span>
          ),
        }}
        element={
          <Authorization roles={['OPD', 'Superadmin']}>
            <Location />
          </Authorization>
        }
      />
    </Route>,
  ]),
  {
    basename: '/',
  }
);

export default router;
