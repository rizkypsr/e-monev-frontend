import { baseUrl } from '../../../utils/constants';

export default async function deletePurpose(authHeader, purposeId) {
  try {
    const purposeResponse = await fetch(`${baseUrl}/purpose/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify({ purpose_id: purposeId }),
    });

    const purposeData = await purposeResponse.json();

    if (!purposeResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server: ${purposeData.message}`);
    }

    return purposeData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
