// CRIADO EM: 24/10/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Projetos.

import { api, token } from "services/api";

export async function patchProjeto(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/projetos/${id}`, payload, token());

  return { data, status };
}

export async function patchProjetoDescJust(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/projetos/descJust/${id}`,
    payload,
    token()
  );

  return { data, status };
}

export async function patchAtividadeProjeto(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/gantt/${id}`, payload, token());

  return { data, status };
}
