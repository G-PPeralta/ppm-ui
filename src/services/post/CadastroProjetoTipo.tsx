import { CadastroProjetoTipo } from 'interfaces/CadastroProjetoTipo';

import { api } from 'services/api';

export async function postProjetoTipo(
  payload: CadastroProjetoTipo,
): Promise<{ status: number }> {
  const { status } = await api.post('/', payload);
  return { status };
}
