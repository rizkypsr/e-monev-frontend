import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deleteOrganization(authHeader, organizationId) {
  const url = `${baseUrl}/org/delete`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify({
      organization_id: organizationId,
    }),
  };
  const organizationResponse = await makeRequest(url, headers);
  return organizationResponse.message;
}
