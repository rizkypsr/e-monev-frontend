import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function updateProgram(authHeader, programBody) {
  const url = `${baseUrl}/program/update`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(programBody),
  };

  const programResponse = await makeRequest(url, headers);
  return programResponse.message;
}
