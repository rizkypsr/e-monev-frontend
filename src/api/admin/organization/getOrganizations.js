import { baseUrl } from "../../../utils/constants";

export default async function getOrganizations(
  authHeader,
  offset = 0,
  limit = 10,
  pageNumber = 1,
  search = ""
) {
  try {
    const organizationResponse = await fetch(
      `${baseUrl}/org/list?offset=${offset}&limit=${limit}&search=${search}` +
        (pageNumber ? `&page=${pageNumber}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }
    );

    if (!organizationResponse.ok) {
      throw new Error("Gagal mendapatkan data dari server");
    }

    const organizationData = await organizationResponse.json();

    return organizationData.data;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
