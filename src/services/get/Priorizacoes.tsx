// CRIADO EM: 23/09/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Priorização.

import { api, token } from "services/api";

export async function getPriorizacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/rankings", token());

  return { data, status };
}

export async function getOpcoesRankings(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/rankings-opcoes/${id}`, token());

  return { data, status };
}
