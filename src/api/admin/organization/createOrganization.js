import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createOrganization(authHeader, organizationBody) {
  const url = `${baseUrl}/org/create`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(organizationBody),
  };
  const organizationResponse = await makeRequest(url, headers);
  return organizationResponse;
}
