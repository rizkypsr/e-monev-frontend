import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

async function extractTotalCount(response) {
  if (response.status === 'fulfilled') {
    const data = await response.value.data;
    return data.total;
  }

  throw new Error(response.reason);
}

export default async function getCounts(authHeader) {
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };

  try {
    const responses = await Promise.allSettled([
      makeRequest(`${baseUrl}/user/list`, headers),
      makeRequest(`${baseUrl}/occassion/list`, headers),
      makeRequest(`${baseUrl}/org/list`, headers),
      makeRequest(`${baseUrl}/program/list`, headers),
      makeRequest(`${baseUrl}/activity/list`, headers),
      makeRequest(`${baseUrl}/purpose/list`, headers),
    ]);

    const [
      userData,
      occasionData,
      organizationData,
      programData,
      activityData,
      purposeData,
    ] = await Promise.all(
      responses.map((response) => extractTotalCount(response))
    );

    return {
      userCount: userData,
      occasionCount: occasionData,
      organizationCount: organizationData,
      programCount: programData,
      activityCount: activityData,
      purposeCount: purposeData,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
