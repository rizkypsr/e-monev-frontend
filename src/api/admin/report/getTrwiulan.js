import { baseUrl } from '../../../utils/constants';

export default async function getTriwulan() {
  try {
    const triwulanResponse = await fetch(`${baseUrl}/static/triwulan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const triwulanData = await triwulanResponse.json();

    if (!triwulanResponse.ok) {
      throw new Error(
        `Gagal mendapatkan data dari server: ${triwulanData.message}`
      );
    }

    return triwulanData.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
