import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function updatePurpose(authHeader, purposeBody) {
  const url = `${baseUrl}/purpose/update`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(purposeBody),
  };

  const purposeResponse = await makeRequest(url, headers);
  return purposeResponse.message;
}
