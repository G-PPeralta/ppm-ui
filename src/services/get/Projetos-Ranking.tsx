// CRIADO EM: 05/10/2022
// AUTOR: Max
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos do modal de Priorização - Projetos.

import { Ranking } from "interfaces/Ranking";
import { ProjetosRanking } from "interfaces/Services";

import { api, token } from "services/api";

export async function getProjetosRanking(): Promise<{
  data: ProjetosRanking;
  status: number;
}> {
  const { data, status } = await api.get("/projetos-ranking", token());

  return { data, status };
}

export async function getRanking(id: number): Promise<Ranking[]> {
  const { data } = await api.get(`projetos-ranking/find/${id}`, token());

  return data;
}
