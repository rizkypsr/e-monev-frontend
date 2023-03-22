import { baseUrl } from "../../../utils/constants";

export default async function createActivity(authHeader, body) {
  try {
    const activityResponse = await fetch(`${baseUrl}/activity/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
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