import axiosClient from '../../../config/axios';

async function deleteReport({ id, token }) {
  try {
    const response = await axiosClient.patch(
      '/data-report/delete',
      {
        data_report_id: id,
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

export default deleteReport;
