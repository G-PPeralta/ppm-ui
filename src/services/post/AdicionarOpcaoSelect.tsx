import { Polo } from 'interfaces/Services';

import { api } from 'services/api';

export async function postNovoPolo(payload: Polo): Promise<{ status: number }> {
  const { status } = await api.post('/polo', payload);
  return { status };
}
