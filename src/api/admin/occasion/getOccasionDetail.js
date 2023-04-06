import { baseUrl, domainUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getOccasionDetail(authHeader, occasionId) {
  const url = `${baseUrl}/occassion/detail/${occasionId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': domainUrl,
      authorization: authHeader(),
    },
  };
  const occasionResponse = await makeRequest(url, headers);
  return occasionResponse.data.result;
}
