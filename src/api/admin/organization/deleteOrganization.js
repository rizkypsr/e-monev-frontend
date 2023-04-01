import { baseUrl, domainUrl } from '../../../utils/constants';

export default async function deleteOrganization(authHeader, organizationId) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': domainUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify({ organization_id: organizationId }),
    });

    const organizationData = await organizationResponse.json();

    if (!organizationResponse.ok) {
      throw new Error(
        `Terjadi kesalahan pada server ${organizationData.message}`
      );
    }

    return organizationData.message;
  } catch (error) {
    throw new Error(error.message);
  }
}
