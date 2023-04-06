import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deleteProgram(authHeader, programId) {
  const url = `${baseUrl}/program/delete`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify({ program_id: programId }),
  };

  const programResponse = await makeRequest(url, headers);
  return programResponse.message;
}
