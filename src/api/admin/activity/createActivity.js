import axiosClient from '../../../config/axios';

async function createActivity({ body, token }) {
  try {
    const response = await axiosClient.post('/activity/create', body, {
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

export default createActivity;
