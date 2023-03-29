import { baseUrl } from '../../../utils/constants';

export default async function deleteActivity(authHeader, activityId) {
  try {
    const activityResponse = await fetch(`${baseUrl}/activity/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify({ activity_id: activityId }),
    });

    const activityData = await activityResponse.json();

    if (!activityResponse.ok) {
      throw new Error(activityData.message);
    }

    return activityData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
