import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getOrganization(authHeader, organizationId) {
  const url = `${baseUrl}/org/detail/${organizationId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };
  const organizationResponse = await makeRequest(url, headers);
  return organizationResponse.data.result;
}
