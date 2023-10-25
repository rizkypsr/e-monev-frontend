import axiosClient from '../../../config/axios';

async function getProgram(id, token) {
  try {
    const response = await axiosClient.get(`/program/detail/${id}`, {
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

export default getProgram;
