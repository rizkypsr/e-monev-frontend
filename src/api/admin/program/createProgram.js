import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function createProgram(authHeader, body) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    const programData = await programResponse.json();

    if (!programResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server: ${programData.message}`);
    }

    return programData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
