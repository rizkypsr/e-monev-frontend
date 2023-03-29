import { baseUrl } from '../../../utils/constants';

export default async function updateOrganization(authHeader, organizationBody) {
  try {
    const organizationResponse = await fetch(`${baseUrl}/org/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        authorization: authHeader(),
      },
      body: JSON.stringify(organizationBody),
    });

    const organizationData = await organizationResponse.json();

    if (!organizationResponse.ok) {
      throw new Error(`Terjadi kesalahan pada server ${organizationData.message}`);
    }

    return 'Organisasi berhasil diubah!';
  } catch (error) {
    throw new Error(error.message);
  }
}
