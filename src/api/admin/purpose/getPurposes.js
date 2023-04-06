import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getPurposes(authHeader, options = {}) {
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

  const url = new URL(`${baseUrl}/purpose/list`);
  url.search = new URLSearchParams(queryParams).toString();

  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };

  const purposeResponse = await makeRequest(url, headers);
  return purposeResponse.data;
}
