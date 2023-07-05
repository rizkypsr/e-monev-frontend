import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getOccasions(authHeader, options = {}) {
  const {
    offset = 0,
    limit = 10,
    page = 1,
    search = '',
    sort = 'terbaru',
  } = options;

  const queryParams = {
    offset,
    limit,
    page,
    search,
    sort,
  };

  const url = new URL(`${baseUrl}/occassion/list`);
  url.search = new URLSearchParams(queryParams).toString();

  const headers = {
    'Content-Type': 'application/json',
    authorization: authHeader(),
  };

  const occasionResponse = await makeRequest(url.toString(), {
    method: 'GET',
    headers,
  });

  return occasionResponse.data;
}
