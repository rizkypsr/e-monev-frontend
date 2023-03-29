import { baseUrl } from '../../../utils/constants';

export default async function deleteOccasion(authHeader, occasionId) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify({ occassion_id: occasionId }),
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
