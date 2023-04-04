import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function deleteUser(authHeader, userId) {
  try {
    const userResponse = await fetch(`${baseUrl}/user/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server: ${userData.message}`);
    }

    return userData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
