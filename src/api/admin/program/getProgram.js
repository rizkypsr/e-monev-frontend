import { baseUrl } from "../../../utils/constants";

export default async function getProgram(authHeader, programId) {
  try {
    const programResponse = await fetch(
      `${baseUrl}/program/detail/${programId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }
    );

    if (!programResponse.ok) {
      throw new Error("Gagal mendapatkan data dari server");
    }

    const programData = await programResponse.json();

    return programData.data.result;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
