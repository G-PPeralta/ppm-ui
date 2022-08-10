import { Polo, LocalProjeto } from 'interfaces/Services';

import { api } from 'services/api';

export async function postNovoPolo(payload: Polo): Promise<{ status: number }> {
  const { status } = await api.post('/polo', payload);
  return { status };
}

export async function postNovoLocalProjeto(
  payload: LocalProjeto,
): Promise<{ status: number }> {
  const { status } = await api.post('/local', payload);
  return { status };
}
