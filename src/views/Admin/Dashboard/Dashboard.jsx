import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import CountUp from "react-countup";
import { getCounts } from "../../../api/admin/dashboard";

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

  const authHeader = useAuthHeader();

  useEffect(() => {
    async function fetchCounts() {
      try {
        const countsData = await getCounts(authHeader);
        setCounts(countsData);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <>
      <h1 className="font-semibold text-2xl mb-8">
        Halo Admin, selamat datang di halaman elektronik aplikasi&nbsp;
        <span className="italic">e-Monev</span>
      </h1>

      <div className="bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 p-8 shadow-2xl shadow-[#F3F6FF]">
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-blue">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#56CCF2" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.occasionCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">URUSAN</h3>
          </div>
        </div>
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-purple">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#BB6BD9" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.organizationCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">ORGANISASI</h3>
          </div>
        </div>
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-green">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#6FCF97" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.programCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">PROGRAM</h3>
          </div>
        </div>
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-yellow">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#F2C94C" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.activityCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">KEGIATAN</h3>
          </div>
        </div>
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-orange">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#F2C94C" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.purposeCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">SASARAN</h3>
          </div>
        </div>
        <div className="sm:w-60 h-20 bg-white shadow-md p-4 flex space-x-4 rounded-lg hover:solid-shadow-gray">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ background: "#BDBDBD" }}></div>
          <div>
            <h2 className="font-semibold text-lg">
              <CountUp
                end={counts.userCount}
                duration={0.7}
              />
            </h2>
            <h3 className="text-sm">LOGIN AKSES USER</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
