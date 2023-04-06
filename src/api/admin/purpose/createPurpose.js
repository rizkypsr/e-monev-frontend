import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createPurpose(authHeader, purposeBody) {
  const url = `${baseUrl}/purpose/create`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(purposeBody),
  };
  const purposeResponse = await makeRequest(url, headers);
  return purposeResponse.message;
}
