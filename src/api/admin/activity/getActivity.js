import { baseUrl } from '../../../utils/constants';

export default async function getActivity(authHeader, activityId) {
  try {
    const activityResponse = await fetch(`${baseUrl}/activity/detail/${activityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
    });

    const activityData = await activityResponse.json();

    if (!activityResponse.ok) {
      throw new Error(activityData.message);
    }

    return activityData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
