export default async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Terjadi kesalahan pada server');
  }

  return responseData;
}
