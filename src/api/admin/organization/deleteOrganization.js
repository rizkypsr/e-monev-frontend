import axiosClient from '../../../config/axios';

async function deleteOrganization({ id, token }) {
  try {
    const response = await axiosClient.patch(
      '/org/delete',
      {
        organization_id: id,
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

export default deleteOrganization;
