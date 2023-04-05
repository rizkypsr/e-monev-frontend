import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deleteReport(authHeader, reportId) {
  const url = new URL(`${baseUrl}/data-report/delete`);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': domainUrl,
    authorization: authHeader(),
  };

  const response = await makeRequest(url.toString(), {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      data_report_id: reportId,
    }),
  });

  return response.message;
}
