import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deletePurpose(authHeader, purposeId) {
  const url = `${baseUrl}/purpose/delete`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify({ purpose_id: purposeId }),
  };
  const purposeResponse = await makeRequest(url, headers);
  return purposeResponse.message;
}
