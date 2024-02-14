import axiosClient from '../../config/axios';

export default async function doRegister(body) {
  try {
    const response = await axiosClient.post('/user/register', body);

    const responseData = response.data;

    if (responseData.statusCode !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}
