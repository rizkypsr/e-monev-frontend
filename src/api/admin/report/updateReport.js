import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function updateReport(authHeader, requestBody) {
  const url = `${baseUrl}/data-report/update`;

  const headers = {
    'Content-Type': 'application/json',
    authorization: authHeader(),
  };

  const response = await makeRequest(url.toString(), {
    method: 'PATCH',
    headers,
    body: JSON.stringify(requestBody),
  });

  return response.message;
}
