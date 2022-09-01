import { CadastroIntervencao } from 'interfaces/CadastroIntervencao';

import { api } from 'services/api';

export async function postIntervencao(
  payload: CadastroIntervencao,
): Promise<{ status: number }> {
  const { status } = await api.post('/intervencoes', payload);
  return { status };
}
