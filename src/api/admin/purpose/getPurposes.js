import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function getPurposes(
  authHeader,
  offset = 0,
  limit = 10,
  pageNumber = 1,
  search = '',
  sort = 'z-a'
) {
  try {
    const purposeResponse = await fetch(
      `${baseUrl}/purpose/list?offset=${offset}&limit=${limit}&search=${search}&sort=${sort}${
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

    const purposeData = await purposeResponse.json();

    if (!purposeResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${purposeData.message}`
      );
    }

    return purposeData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
