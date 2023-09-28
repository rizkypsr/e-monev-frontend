import axiosClient from '../../config/axios';

export default async function login({ username, password }) {
  try {
    const response = await axiosClient.post('/user/login', {
      username,
      password,
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
