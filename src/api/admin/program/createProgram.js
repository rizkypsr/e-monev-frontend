import { baseUrl } from "../../../utils/constants";

export default async function createProgram(authHeader, body) {
  try {
    const programResponse = await fetch(`${baseUrl}/program/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!programResponse.ok) {
      throw new Error("Gagal menambahkan Program");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menambahkan Program");
  }
}
