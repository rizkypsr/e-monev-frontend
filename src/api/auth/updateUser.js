import axiosClient from '../../config/axios';

export default async function updateUser({ body, token }) {
  try {
    const response = await axiosClient.patch('/user/update', body, {
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
