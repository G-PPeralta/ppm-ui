// CRIADO EM: 20/09/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Lições Aprendidas (inclui Detalhamento de Projetos).

import { LicoesAprendidasNew, LicoesAprendidas } from "interfaces/Services";

import { api, token } from "services/api";

export async function getLicoesAprendidas(id: string): Promise<{
  data: LicoesAprendidasNew[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos-atividades-licoes-aprendidas/${id}`,
    token()
  );

  return { data, status };
}

export async function getAllLicoesAprendidas(): Promise<{
  data: LicoesAprendidas[];
  status: number;
}> {
  const { data, status } = await api.get(
    "/projetos-atividades-licoes-aprendidas",
    token()
  );

  return { data, status };
}
