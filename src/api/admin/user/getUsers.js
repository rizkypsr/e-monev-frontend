import { baseUrl } from "../../../utils/constants";

export default async function getUsers(
  authHeader,
  offset = 0,
  limit = 10,
  pageNumber = 1,
  search = ""
) {
  try {
    const userResponse = await fetch(
      `${baseUrl}/user/list?offset=${offset}&limit=${limit}&search=${search}` +
        (pageNumber ? `&page=${pageNumber}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }
    );

    const usersData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${usersData.message}`
      );
    }

    return usersData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
