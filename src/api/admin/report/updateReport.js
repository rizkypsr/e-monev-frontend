import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function updateReport(authHeader, requestBody) {
  try {
    const reportResponse = await fetch(`${baseUrl}/data-report/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(requestBody),
    });

    const reportData = await reportResponse.json();

    if (!reportResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server: ${reportData.message}`);
    }

    return reportData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
