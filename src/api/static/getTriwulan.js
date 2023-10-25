import axiosClient from '../../config/axios';

export default async function getTriwulan(token) {
  try {
    const response = await axiosClient.get('/static/triwulan', {
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
