import { baseUrl } from '../../../utils/constants';

export default async function getProgram(authHeader, programId) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/detail/${programId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
    });

    const programData = await programResponse.json();

    if (!programResponse.ok) {
      throw new Error(`Gagal mendapatkan data dari server: ${programData.message}`);
    }

    return programData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
