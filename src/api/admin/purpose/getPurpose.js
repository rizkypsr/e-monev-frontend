import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

export default async function getPurpose(authHeader, purposeId) {
  const url = `${baseUrl}/purpose/detail/${purposeId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: authHeader(),
    },
  };
  const purposeResponse = await makeRequest(url, headers);
  return purposeResponse.data.result;
}
