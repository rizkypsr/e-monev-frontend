import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function getReports(
  authHeader,
  { offset = 0, limit = 10, pageNumber = 1, search = '', sort = 'z-a' }
) {
  try {
    const reportResponse = await fetch(
      `${baseUrl}/data-report/list?offset=${offset}&limit=${limit}&search=${search}&sort=${sort}${
        pageNumber ? `&page=${pageNumber}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': domainUrl,
          authorization: authHeader(),
        },
      }
    );

    const reportsData = await reportResponse.json();

    if (!reportResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${reportsData.message}`
      );
    }

    return reportsData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
