import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function updateActivity(authHeader, activityBody) {
  const url = `${baseUrl}/activity/update`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(activityBody),
  };

  const activityResponse = await makeRequest(url, headers);
  return activityResponse.message;
}
