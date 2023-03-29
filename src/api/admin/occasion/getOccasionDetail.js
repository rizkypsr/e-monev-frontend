import { baseUrl } from '../../../utils/constants';

export default async function getOccasionDetail(authHeader, occasionId) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/detail/${occasionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
    });

    const occasionData = await occasionResponse.json();

    if (!occasionResponse.ok) {
      throw new Error(`Gagal mendapatkan data dari server: ${occasionData.message}`);
    }

    return occasionData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
