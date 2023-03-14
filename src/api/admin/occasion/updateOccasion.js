import { baseUrl } from "../../../utils/constants";

export default async function updateOccasion(authHeader, occasionBody) {
  try {
    const occasionResponse = await fetch(`${baseUrl}/occassion/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(occasionBody),
    });

    if (!occasionResponse.ok) {
      throw new Error("Gagal mengubah Urusan! Terjadi kesalahan pada server.");
    }

    return "Urusan berhasil diubah!";
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mengubah Urusan! Terjadi kesalahan pada server.");
  }
}
