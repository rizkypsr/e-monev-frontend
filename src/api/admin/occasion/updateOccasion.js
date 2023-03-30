import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function updateOccasion(authHeader, occasionBody) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(occasionBody),
    });

    const occasionData = await occasionResponse.json();

    if (!occasionResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server: ${occasionData.message}`);
    }

    return occasionData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
