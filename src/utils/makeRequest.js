export async function makeRequest(url, headers, method = "GET", body) {
  const options = {
    method,
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const jsonData = await response.json();
  return jsonData.data.result;
}
