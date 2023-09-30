import axiosClient from '../../../config/axios';

async function updatePurpose({ body, token }) {
  try {
    const response = await axiosClient.patch('/purpose/update', body, {
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

export default updatePurpose;
