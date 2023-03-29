import { baseUrl } from '../../../utils/constants';

export default async function updateProgram(authHeader, programBody) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
      body: JSON.stringify(programBody),
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
