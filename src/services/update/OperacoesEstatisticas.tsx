// CRIADO EM: 08/10/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Cronograma - Operações.

import { api, token } from "services/api";

export async function patchOperacoesEstatisticas(
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/editar-atividade/`,
    payload,
    token()
  );

  return { data, status };
}
