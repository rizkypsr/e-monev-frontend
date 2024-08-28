import axiosClient from '../../../config/axios';

async function downloadTriwulanExcel(params, token, id) {
  try {
    const response = await axiosClient.get(
      `/data-report/user/data-triwulan/excel${id ? `/${id}` : ''}`,
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

export default downloadTriwulanExcel;
