import { baseUrl } from "../../../utils/constants";

export default async function deleteOccasion(authHeader, occasionId) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/delete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify({ occassion_id: occasionId }),
    });

    if (!occasionResponse.ok) {
      throw new Error("Gagal menghapus Urusan! Terjadi kesalahan pada server.");
    }

    return "Urusan berhasil dihapus!";
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghapus Urusan! Terjadi kesalahan pada server.");
  }
}
