import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getActivity(authHeader, activityId) {
  const url = `${baseUrl}/activity/detail/${activityId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };

  const activityResponse = await makeRequest(url, headers);
  return activityResponse.data.result;
}
