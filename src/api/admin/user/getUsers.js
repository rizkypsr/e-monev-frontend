import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function getUsers(
  authHeader,
  { offset = 0, limit = 10, pageNumber = 1, search = '', sort = 'terbaru' }
) {
  try {
    const userResponse = await fetch(
      `${baseUrl}/user/list?offset=${offset}&limit=${limit}&search=${search}&sort=${sort}${
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

    const usersData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${usersData.message}`
      );
    }

    return usersData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
