import { baseUrl } from '../../../utils/constants';
import makeRequest from '../../../utils/makeRequest';

const getUser = async (authHeader, userId) => {
  const url = `${baseUrl}/user/detail/${userId}`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const userResponse = await makeRequest(url, headers);
  return userResponse.data;
};

export default getUser;
