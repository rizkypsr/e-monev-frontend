import axiosClient from '../../../config/axios';

async function createMaster({ body, token }) {
  try {
    const response = await axiosClient.post('/data-master/create', body, {
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

export default createMaster;
