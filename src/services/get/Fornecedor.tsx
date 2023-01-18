// CRIADO EM: 07/09/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Fornecedores.

import { api, token } from "services/api";

export async function getFornecedor(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("/fornecedores", token());

  return { data, status };
}
