import { baseUrl } from "../../../utils/constants";

export default async function deleteOrganization(authHeader, organizationId) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/delete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify({ occassion_id: organizationId }),
    });

    if (!organizationResponse.ok) {
      throw new Error(
        "Gagal menghapus Organisasi! Terjadi kesalahan pada server."
      );
    }

    return "Organisasi berhasil dihapus!";
  } catch (error) {
    console.error(error);
    throw new Error(
      "Gagal menghapus Organisasi! Terjadi kesalahan pada server."
    );
  }
}
