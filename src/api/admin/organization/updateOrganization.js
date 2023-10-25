import axiosClient from '../../../config/axios';

async function updateOrganization({ body, token }) {
  try {
    const response = await axiosClient.patch('/org/update', body, {
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

export default updateOrganization;
