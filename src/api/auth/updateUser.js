import { baseUrl } from '../../utils/constants';

const updateUser = async (userBody) => {
  try {
    const userResponse = await fetch(`${baseUrl}/user/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
      },
      body: JSON.stringify(userBody),
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(userData.message);
    }

    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateUser;
