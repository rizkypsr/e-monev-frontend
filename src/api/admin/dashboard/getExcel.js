import axiosClient from '../../../config/axios';

async function getExcel(token) {
  try {
    const response = await axiosClient.get('/dashboard/excel', {
      headers: {
        Authorization: token,
        'Content-Type': 'blob',
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

export default getExcel;
