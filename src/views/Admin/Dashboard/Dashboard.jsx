import { useEffect, useRef, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
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
        <span className="italic">e-Monev</span>
      </h1>

      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 p-8 shadow-2xl shadow-[#F3F6FF]">
        <CountBox
          count={counts.occasionCount}
          color="#56CCF2"
          hoverColor="solid-shadow-blue"
        />
        <CountBox
          count={counts.organizationCount}
          color="#BB6BD9"
          hoverColor="solid-shadow-purple"
        />
        <CountBox
          count={counts.programCount}
          color="#6FCF97"
          hoverColor="solid-shadow-green"
        />
        <CountBox
          count={counts.activityCount}
          color="#F2C94C"
          hoverColor="solid-shadow-yellow"
        />
        <CountBox
          count={counts.purposeCount}
          color="#F2994A"
          hoverColor="solid-shadow-orange"
        />
        <CountBox
          count={counts.userCount}
          color="#BDBDBD"
          hoverColor="solid-shadow-gray"
        />
      </div>
    </>
  );
}

export default Dashboard;
