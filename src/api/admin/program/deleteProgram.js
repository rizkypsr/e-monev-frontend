import axiosClient from '../../../config/axios';

async function deleteProgram({ id, token }) {
  try {
    const response = await axiosClient.patch(
      '/program/delete',
      {
        program_id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const responseData = response.data;

    if (responseData.statusCode !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}

export default deleteProgram;
