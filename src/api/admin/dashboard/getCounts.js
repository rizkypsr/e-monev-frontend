import { baseUrl } from "../../../utils/constants";

export default async function getCounts(authHeader) {
  try {
    const [
      userResponse,
      occasionResponse,
      organizationResponse,
      programResponse,
      activityResponse,
      purposeResponse,
    ] = await Promise.allSettled([
      fetch(`${baseUrl}/user/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/occassion/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/org/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/program/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/activity/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
      fetch(`${baseUrl}/purpose/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader(),
        },
      }),
    ]);

    const userResponseValue =
      userResponse.status === "fulfilled" ? userResponse.value : null;
    const occasionResponseValue =
      occasionResponse.status === "fulfilled" ? occasionResponse.value : null;
    const organizationResponseValue =
      organizationResponse.status === "fulfilled"
        ? organizationResponse.value
        : null;
    const programResponseValue =
      programResponse.status === "fulfilled" ? programResponse.value : null;
    const activityResponseValue =
      activityResponse.status === "fulfilled" ? activityResponse.value : null;
    const purposeResponseValue =
      purposeResponse.status === "fulfilled" ? purposeResponse.value : null;

    if (
      !userResponseValue ||
      !occasionResponseValue ||
      !organizationResponseValue ||
      !programResponseValue ||
      !activityResponseValue ||
      !purposeResponseValue
    ) {
      throw new Error("Gagal mendapatkan data dari server");
    }

    const [
      userData,
      occasionData,
      organizationData,
      programData,
      activityData,
      purposeData,
    ] = await Promise.all([
      userResponseValue.json(),
      occasionResponseValue.json(),
      organizationResponseValue.json(),
      programResponseValue.json(),
      activityResponseValue.json(),
      purposeResponseValue.json(),
    ]);

    return {
      userCount: userData.data.total,
      occasionCount: occasionData.data.total,
      organizationCount: organizationData.data.total,
      programCount: programData.data.total,
      activityCount: activityData.data.total,
      purposeCount: purposeData.data.total,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data dari server");
  }
}
