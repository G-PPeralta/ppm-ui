// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Financeiro.

import { api, token } from "services/api";

export async function postCadastroDespesa(
  idProjeto: number,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    `/centro-custo/${idProjeto}`,
    payload,
    token()
  );
  return { status };
}
