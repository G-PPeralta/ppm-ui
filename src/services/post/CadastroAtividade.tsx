import { CadastroAtividade } from 'interfaces/CadastroAtividade';

import { api } from 'services/api';

export async function postCadastroAtividade(
  payload: CadastroAtividade,
): Promise<{ status: number }> {
  const { status } = await api.post('/', payload);
  return { status };
}
