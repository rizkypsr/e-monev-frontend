import axiosClient from '../../../config/axios';

async function downloadTriwulanRowExcel(params, token) {
  console.log(params, token);
  try {
    const response = await axiosClient.get(
      '/data-report/user/data-triwulan/excel',
      {
        params,
        headers: {
          Authorization: token,
        },
        responseType: 'blob',
      }
    );

    console.log(response);

    // const responseData = response.data;

    // if (response.status !== 200) {
    //   throw new Error(responseData.message);
    // }

    // return responseData;
  } catch (err) {
    throw new Error(err);
  }
}

export default downloadTriwulanRowExcel;
