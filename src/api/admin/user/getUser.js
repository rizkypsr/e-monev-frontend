import { baseUrl } from "../../../utils/constants";

const getUser = async (authHeader, userId) => {
  try {
    const userResponse = await fetch(`${baseUrl}/user/detail/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${userData.message}`
      );
    }

    return userData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUser;
