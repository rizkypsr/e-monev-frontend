import axiosClient from '../../../config/axios';

async function getFundSource(id, token) {
  try {
    const response = await axiosClient.get(`/fund-source/${id}`, {
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

export default getFundSource;
