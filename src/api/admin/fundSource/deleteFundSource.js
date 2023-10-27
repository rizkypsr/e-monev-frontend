import axiosClient from '../../../config/axios';

async function deleteFundSource({ id, token }) {
  try {
    const response = await axiosClient.delete(`/fund-source/${id}`, {
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

export default deleteFundSource;
