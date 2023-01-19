// CRIADO EM: 13/10/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Financeiros.

import { api, token } from "services/api";

export async function patchEditarDespesa(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/centro-custo/${id}`,
    payload,
    token()
  );

  return { data, status };
}
