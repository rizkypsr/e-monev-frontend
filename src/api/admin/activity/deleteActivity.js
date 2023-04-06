import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deleteActivity(authHeader, activityId) {
  const url = `${baseUrl}/activity/delete`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': domainUrl,
      authorization: authHeader(),
    },
    body: JSON.stringify({ activity_id: activityId }),
  };

  const activityResponse = await makeRequest(url, headers);
  return activityResponse.message;
}
