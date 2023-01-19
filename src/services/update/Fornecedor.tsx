// CRIADO EM: 24/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Fornecedores.

import { api, token } from "services/api";

export async function putFornecedor(
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/fornecedores`, payload, token());

  return { data, status };
}
