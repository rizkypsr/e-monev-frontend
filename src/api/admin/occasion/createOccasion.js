import { baseUrl } from "../../../utils/constants";

export default async function createOccasion(authHeader, body) {
  try {
    console.log(body);
    const occasionResponse = await fetch(`${baseUrl}/occassion/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    const occasionData = await occasionResponse.json();

    if (!occasionResponse.ok) {
      throw new Error(occasionData);
    }

    return occasionData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
