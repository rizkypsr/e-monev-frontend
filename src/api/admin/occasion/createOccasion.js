import { baseUrl } from "../../../utils/constants";

export default async function createOccasion(authHeader, body) {
  try {
    console.log(body);
    const occasionResponse = await fetch(`${baseUrl}/occassion/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!occasionResponse.ok) {
      throw new Error("Gagal menambahkan Urusan");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menambahkan Urusan");
  }
}
