import { baseUrl } from './constants';

export default async function makeRequest(url, authHeader) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': baseUrl,
      authorization: authHeader(),
    },
  });

  return response;
}
