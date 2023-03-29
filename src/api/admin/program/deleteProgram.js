import { baseUrl } from '../../../utils/constants';

export default async function deleteProgram(authHeader, programId) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
      body: JSON.stringify({ program_id: programId }),
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
