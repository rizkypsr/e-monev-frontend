import { baseUrl } from "../../../utils/constants";

export default async function getOccasions(
  authHeader,
  offset = 0,
  limit = 10,
  pageNumber = 1,
  search = ""
) {
  try {
    const occasionResponse = await fetch(
      `${baseUrl}/occassion/list?offset=${offset}&limit=${limit}&search=${search}` +
        (pageNumber ? `&page=${pageNumber}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }
    );

    const occasionData = await occasionResponse.json();

    if (!occasionResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${occasionData.message}`
      );
    }

    return occasionData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
