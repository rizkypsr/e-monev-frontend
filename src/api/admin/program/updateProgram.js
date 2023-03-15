import { baseUrl } from "../../../utils/constants";

export default async function updateProgram(authHeader, programBody) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(programBody),
    });

    if (!programResponse.ok) {
      throw new Error("Gagal mengubah Program! Terjadi kesalahan pada server.");
    }

    return "Program berhasil diubah!";
  } catch (error) {
    throw new Error("Gagal mengubah Program! Terjadi kesalahan pada server.");
  }
}
