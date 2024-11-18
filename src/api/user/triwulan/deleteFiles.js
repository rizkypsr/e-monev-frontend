import axiosClient from '../../../config/axios';

async function deleteFiles({ id, token, body }) {
  try {
    const response = await axiosClient.delete(`/data-triwulan/${id}/files`, {
      headers: {
        Authorization: token,
      },
      data: body,
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

export default deleteFiles;
