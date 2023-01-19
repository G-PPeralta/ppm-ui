// CRIADO EM: 23/10/2022
// AUTOR:Magno
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) aos modais de operação - Cronogramas.

import { api, token } from "services/api";

export async function postOperacoesEstatisticas(
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/estatisticas/projetos/`,
    payload,
    token()
  );

  return { data, status };
}
