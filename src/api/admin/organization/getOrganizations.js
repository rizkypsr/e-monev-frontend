import axiosClient from '../../../config/axios';

export default async function getOrganizations(params, token) {
  try {
    const response = await axiosClient.get('/org/list', {
      params,
      headers: {
        Authorization: token,
      },
    });

    const responseData = response.data;

    if (responseData.statusCode !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}
