import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function createPurpose(authHeader, purposeBody) {
  try {
    const purposeResponse = await fetch(`${baseUrl}/purpose/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(purposeBody),
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
