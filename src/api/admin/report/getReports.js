import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getReports(authHeader, options = {}) {
  const {
    offset = 0,
    limit = 10,
    pageNumber = 1,
    search = '',
    sort = 'terbaru',
    month,
    year,
    triwulan,
  } = options;

  const queryParams = {
    offset,
    limit,
    page: pageNumber,
    search,
    sort,
    ...(month && { month }),
    ...(year && { year }),
    ...(triwulan && { triwulan_id: triwulan }),
  };

  const url = new URL(`${baseUrl}/data-report/list`);
  url.search = new URLSearchParams(queryParams).toString();

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': domainUrl,
    authorization: authHeader(),
  };

  const response = await makeRequest(url.toString(), {
    method: 'GET',
    headers,
  });

  return response.data;
}
