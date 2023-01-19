// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Fornecedor.

import { api, token } from "services/api";

export async function postCadastroFornecedor(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/fornecedores", payload, token());
  return { status };
}
