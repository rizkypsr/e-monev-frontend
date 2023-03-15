import { baseUrl } from "../../../utils/constants";

export default async function deleteProgram(authHeader, programId) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/delete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify({ occassion_id: programId }),
    });

    if (!programResponse.ok) {
      throw new Error(
        "Gagal menghapus Program! Terjadi kesalahan pada server."
      );
    }

    return "Program berhasil dihapus!";
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghapus Program! Terjadi kesalahan pada server.");
  }
}
