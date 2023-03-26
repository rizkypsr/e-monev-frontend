import { baseUrl } from "../../../utils/constants";

export default async function getPurposes(
  authHeader,
  offset = 0,
  limit = 10,
  pageNumber = 1,
  search = ""
) {
  try {
    const purposeResponse = await fetch(
      `${baseUrl}/purpose/list?offset=${offset}&limit=${limit}&search=${search}` +
        (pageNumber ? `&page=${pageNumber}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }
    );

    const purposeData = await purposeResponse.json();

    if (!purposeResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${purposeData.message}`
      );
    }

    return programData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
