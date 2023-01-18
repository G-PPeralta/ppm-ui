// CRIADO EM: 16/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Lixeira.

import { Lixeira } from "interfaces/Lixeira";

import { api, token } from "services/api";

export async function getLixeira(): Promise<{
  data: Lixeira[];
  status: number;
}> {
  const { data, status } = await api.get(`/lixeira`, token());

  return { data, status };
}
