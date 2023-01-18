// CRIADO EM: 14/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Fornecedor

import { api, token } from "services/api";

export async function deleteFornecedor(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/fornecedores/${id}/${user}`,
    token()
  );

  return { data, status };
}
