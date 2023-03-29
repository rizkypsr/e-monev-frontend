export default async function makeRequest(url, authHeader) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authHeader(),
    },
  });

  return response;
}
