import axiosClient from '../../../config/axios';

async function createTriwulan({ body, token }) {
  try {
    const response = await axiosClient.post('/data-triwulan', body, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
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

export default createTriwulan;
