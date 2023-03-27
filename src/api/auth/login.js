import { baseUrl } from "../../utils/constants";

export default async function login(body) {
  try {
    const loginResponse = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(loginData.message);
    }

    return loginData;
  } catch (error) {
    throw new Error(error.message);
  }
}