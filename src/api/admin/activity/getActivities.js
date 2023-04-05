import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function getActivities(
  authHeader,
  { sort = 'terbaru', offset = 0, limit = 10, pageNumber = 1, search = '' }
) {
  try {
    const activityResponse = await fetch(
      `${baseUrl}/activity/list?offset=${offset}&limit=${limit}&search=${search}&sort=${sort}${
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

    const activityData = await activityResponse.json();

    if (!activityResponse.ok) {
      throw new Error(activityData.message);
    }

    return activityData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
