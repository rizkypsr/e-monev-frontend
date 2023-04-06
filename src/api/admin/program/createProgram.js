import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createProgram(authHeader, body) {
  const url = `${baseUrl}/program/create`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(body),
  };

  const programResponse = await makeRequest(url, headers);
  return programResponse;
}
