import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getProgram(authHeader, programId) {
  const url = `${baseUrl}/program/detail/${programId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };
  const programResponse = await makeRequest(url, headers);
  return programResponse.data.result;
}
