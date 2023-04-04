import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function getReport(authHeader, reportId) {
  try {
    const reportResponse = await fetch(
      `${baseUrl}/data-report/detail/${reportId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': domainUrl,
          authorization: authHeader(),
        },
      }
    );

    const reportData = await reportResponse.json();

    if (!reportResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${reportData.message}`
      );
    }

    return reportData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
