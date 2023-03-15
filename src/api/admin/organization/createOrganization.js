import { baseUrl } from "../../../utils/constants";

export default async function createOrganization(authHeader, body) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!organizationResponse.ok) {
      throw new Error("Gagal menambahkan Organisasi");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menambahkan Organisasi");
  }
}
