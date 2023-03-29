import { baseUrl } from '../../../utils/constants';

export default async function updateActivity(authHeader, activityBody) {
  try {
    const activityResponse = await fetch(`${baseUrl}/activity/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(activityBody),
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
