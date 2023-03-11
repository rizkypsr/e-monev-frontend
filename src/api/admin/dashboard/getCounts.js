import { baseUrl } from "../../../utils/constants";

export default async function getCounts(authHeader) {
  try {
    const [userResponse, occasionResponse] = await Promise.allSettled([
      fetch(`${baseUrl}/user/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/occassion/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
    ]);

    const userResponseValue =
      userResponse.status === "fulfilled" ? userResponse.value : null;
    const occasionResponseValue =
      occasionResponse.status === "fulfilled" ? occasionResponse.value : null;

    if (!userResponseValue || !occasionResponseValue) {
      throw new Error("Gagal mendapatkan data dari server");
    }

    const [userData, occasionData] = await Promise.all([
      userResponseValue.json(),
      occasionResponseValue.json(),
    ]);

    return {
      userCount: userData.data.total,
      occasionCount: occasionData.data.total,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
