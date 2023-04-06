import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getReport(authHeader, reportId) {
  const url = new URL(`${baseUrl}/data-report/detail/${reportId}`);

  const headers = {
    'Content-Type': 'application/json',
    authorization: authHeader(),
  };

  const response = await makeRequest(url.toString(), {
    method: 'GET',
    headers,
  });

  return response.data.result;
}
