import { baseUrl } from '../../../utils/constants';

export default async function getPurpose(authHeader, purposeId) {
  try {
    const purposeResponse = await fetch(`${baseUrl}/purpose/detail/${purposeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
    });

    const purposeData = await purposeResponse.json();

    if (!purposeResponse.ok) {
      throw new Error(`Gagal mendapatkan data dari server: ${purposeData.message}`);
    }

    return purposeData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
