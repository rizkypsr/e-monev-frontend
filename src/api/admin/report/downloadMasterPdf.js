import axiosClient from '../../../config/axios';

async function downloadMasterPdf(params, token) {
  try {
    const response = await axiosClient.get(
      '/data-report/user/data-master/pdf',
      {
        params,
        headers: {
          Authorization: token,
        },
        responseType: 'blob',
      }
    );

    const responseData = response.data;

    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err) {
    throw new Error(err);
  }
}

export default downloadMasterPdf;
