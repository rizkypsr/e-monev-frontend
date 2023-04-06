import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function deleteOccasion(authHeader, occasionId) {
  const url = `${baseUrl}/occassion/delete`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify({
      occassion_id: occasionId,
    }),
  };
  const occasionResponse = await makeRequest(url, headers);
  return occasionResponse.message;
}
