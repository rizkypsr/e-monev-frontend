import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

async function extractTotalCount(response) {
  if (response.status === 'fulfilled') {
    const data = await response.value.json();
    if (response.value.ok) {
      return data.data.total;
    }
    throw new Error(data.message);
  }

  throw new Error(response.reason);
}

export default async function getCounts(authHeader) {
  try {
    const responses = await Promise.allSettled([
      makeRequest(`${baseUrl}/user/list`, authHeader),
      makeRequest(`${baseUrl}/occassion/list`, authHeader),
      makeRequest(`${baseUrl}/org/list`, authHeader),
      makeRequest(`${baseUrl}/program/list`, authHeader),
      makeRequest(`${baseUrl}/activity/list`, authHeader),
      makeRequest(`${baseUrl}/purpose/list`, authHeader),
    ]);

    const [userData, occasionData, organizationData, programData, activityData, purposeData] = await Promise.all(responses.map((response) => extractTotalCount(response)));

    return {
      userCount: userData,
      occasionCount: occasionData,
      organizationCount: organizationData,
      programCount: programData,
      activityCount: activityData,
      purposeCount: purposeData,
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan pada server: ${error.message}`);
  }
}
