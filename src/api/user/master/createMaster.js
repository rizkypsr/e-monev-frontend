import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createMaster(authHeader, requestBody) {
  const url = `${baseUrl}/data-master/create`;

  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(requestBody),
  };

  const response = await makeRequest(url, headers);

  return response.message;
}
