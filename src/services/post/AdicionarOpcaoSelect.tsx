import { Polo, LocalProjeto, Solicitante } from 'interfaces/Services';

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

export async function postNovoSolicitante(
  payload: Solicitante,
): Promise<{ status: number }> {
  const { status } = await api.post('/solicitante', payload);
  return { status };
}
