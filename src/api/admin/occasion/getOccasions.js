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

    if (!occasionResponse.ok) {
      throw new Error("Gagal mendapatkan data dari server");
    }

    const occasionData = await occasionResponse.json();

    return occasionData.data;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
