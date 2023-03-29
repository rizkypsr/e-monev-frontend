import { baseUrl } from '../../../utils/constants';

export default async function getOrganization(authHeader, organizationId) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/detail/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader(),
      },
    });

    const organizationData = await organizationResponse.json();

    if (!organizationResponse.ok) {
      throw new Error(`Gagal mendapatkan data dari server ${organizationData.message}`);
    }

    return organizationData.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
}
