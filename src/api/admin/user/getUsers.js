import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getUsers(authHeader, options = {}) {
  const url = new URL(`${baseUrl}/user/list`);
  url.search = new URLSearchParams(options).toString();

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
