import axiosClient from '../../../config/axios';

export default async function getPrograms(params, token) {
  try {
    const response = await axiosClient.get('/program/list', {
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
