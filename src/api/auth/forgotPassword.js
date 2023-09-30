import axiosClient from '../../config/axios';

async function forgotPassword({ email }) {
  try {
    const response = await axiosClient.post('/user/forgot-password', {
      email,
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

export default forgotPassword;
