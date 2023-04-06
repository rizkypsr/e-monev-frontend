import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createActivity(authHeader, activityBody) {
  const url = `${baseUrl}/activity/create`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': domainUrl,
      authorization: authHeader(),
    },
    body: JSON.stringify(activityBody),
  };
  const activityResponse = await makeRequest(url, headers);
  return activityResponse.message;
}
