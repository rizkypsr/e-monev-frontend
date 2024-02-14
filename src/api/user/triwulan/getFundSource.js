import axiosClient from '../../../config/axios';

async function getFundSource(params, token) {
  try {
    const response = await axiosClient.get('/fund-source/list', {
      params,
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
