import { baseUrl } from "../../../utils/constants";

export default async function getOrganization(authHeader, organizationId) {
  try {
    const organizationResponse = await fetch(
      `${baseUrl}/org/detail/${organizationId}`,
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

    return organizationData.data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
