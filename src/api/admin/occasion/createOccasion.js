import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function createOccasion(authHeader, occasionBody) {
  const url = `${baseUrl}/occassion/create`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
    body: JSON.stringify(occasionBody),
  };
  const occasionResponse = await makeRequest(url, headers);
  return occasionResponse;
}
