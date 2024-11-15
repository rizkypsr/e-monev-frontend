import axiosClient from '../../../config/axios';

export default async function getUsersAll(params, token) {
  try {
    const response = await axiosClient.get('/user/listAll', {
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
