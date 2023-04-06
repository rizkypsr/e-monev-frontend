import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getPrograms(authHeader, options = {}) {
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

  const url = new URL(`${baseUrl}/program/list`);
  url.search = new URLSearchParams(queryParams).toString();

  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };

  const programResponse = await makeRequest(url, headers);
  return programResponse.data;
}
