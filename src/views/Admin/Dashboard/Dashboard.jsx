import { useEffect, useRef, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { getCounts } from '../../../api/admin/dashboard';
import ErrorPage from '../../ErrorPage';
import CountBox from './components/CountBox';

function Dashboard() {
  const [counts, setCounts] = useState({
    userCount: 0,
    occasionCount: 0,
    organizationCount: 0,
    programCount: 0,
    activityCount: 0,
    purposeCount: 0,
  });
  const [error, setError] = useState(null);

  const authUser = useRef(useAuthUser());
  const authHeaderRef = useRef(useAuthHeader());

  useEffect(() => {
    async function fetchCounts() {
      try {
        const countsData = await getCounts(authHeaderRef.current);
        setCounts(countsData);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCounts();
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">
        Halo Admin, selamat datang di halaman elektronik aplikasi&nbsp;
        <span className="italic">e-Montir Pemda</span>
      </h1>

      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 p-8 shadow-2xl shadow-[#F3F6FF]">
        {authUser.current.role === 1 ? (
          <>
            <CountBox
              linkTo="urusan"
              title="urusan"
              count={counts.occasionCount}
              color="#56CCF2"
              className="hover:solid-shadow-blue"
            />
            <CountBox
              linkTo="organisasi"
              title="organisasi"
              count={counts.organizationCount}
              color="#BB6BD9"
              className="hover:solid-shadow-purple"
            />
            <CountBox
              linkTo="program"
              title="program"
              count={counts.programCount}
              color="#6FCF97"
              className="hover:solid-shadow-green"
            />
            <CountBox
              linkTo="kegiatan"
              title="kegiatan"
              count={counts.activityCount}
              color="#F2C94C"
              className="hover:solid-shadow-yellow"
            />
            <CountBox
              linkTo="sasaran"
              title="sasaran"
              count={counts.purposeCount}
              color="#F2994A"
              className="hover:solid-shadow-orange"
            />
            <CountBox
              linkTo="login-akses-user"
              title="user"
              count={counts.userCount}
              color="#BDBDBD"
              className="hover:solid-shadow-gray"
            />
          </>
        ) : (
          <CountBox
            linkTo="program"
            title="program"
            count={counts.programCount}
            color="#6FCF97"
            className="hover:solid-shadow-green"
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
