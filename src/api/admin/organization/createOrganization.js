import { baseUrl } from '../../../utils/constants';

export default async function createOrganization(authHeader, body) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
      body: JSON.stringify(body),
    });

    const organizationData = await organizationResponse.json();

    if (!organizationResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server ${organizationData.message}`);
    }

    return organizationData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
