import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function createOccasion(authHeader, body) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    const occasionData = await occasionResponse.json();

    if (!occasionResponse.ok) {
      throw new Error(`${occasionData.message}`);
    }

    return occasionData;
  } catch (error) {
    throw new Error(error.message);
  }
}
