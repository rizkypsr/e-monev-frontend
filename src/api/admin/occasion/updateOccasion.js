import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function updateOccasion(authHeader, occasionBody) {
  const url = `${baseUrl}/occassion/update`;
  const headers = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(occasionBody),
  };
  const occasionResponse = await makeRequest(url, headers);
  return occasionResponse.message;
}
