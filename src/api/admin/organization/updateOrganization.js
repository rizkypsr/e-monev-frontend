import { baseUrl } from "../../../utils/constants";

export default async function updateOrganization(authHeader, organizationBody) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(organizationBody),
    });

    if (!organizationResponse.ok) {
      throw new Error("Gagal mengubah Organisasi! Terjadi kesalahan pada server.");
    }

    return "Organisasi berhasil diubah!";
  } catch (error) {
    throw new Error(
      "Gagal mengubah Organisasi! Terjadi kesalahan pada server."
    );
  }
}
