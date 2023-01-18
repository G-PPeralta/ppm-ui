// CRIADO EM: 20/10/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Ranking.

import { api, token } from "services/api";

export async function getInitialRaking(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos-ranking/find/${id}`,
    token()
  );

  return { data, status };
}
