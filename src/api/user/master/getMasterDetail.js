import axiosClient from '../../../config/axios';

async function getMasterDetail(id, token) {
  try {
    const response = await axiosClient.get(`/data-master/detail/${id}`, {
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

export default getMasterDetail;
