// CRIADO EM: 07/09/2022
// AUTOR: Maxwell
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Tarefas.

import { ICurvaS } from "interfaces/CurvaS";

import { api, token } from "services/api";

export async function getAtivadesPendencia(idProject: number): Promise<any[]> {
  const { data } = await api.get(
    `/projetos-atividades/pendencia/${idProject}`,
    token()
  );
  return data;
}

export async function getCurvaS(idProject: number): Promise<ICurvaS[]> {
  const { data } = await api.get(
    `/projetos-atividades/curva-s/${idProject}`,
    token()
  );
  return data;
}
