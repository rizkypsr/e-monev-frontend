import axiosClient from '../../../config/axios';

async function getFundSourceChart(params, token) {
  try {
    const response = await axiosClient.get('/dashboard/chart/pagu-dana', {
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

export default getFundSourceChart;
