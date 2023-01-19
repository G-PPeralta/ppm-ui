// CRIADO EM: 07/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Carteiros de Projetos.

import { api, token } from "services/api";

export async function postCadastroAtividadeProjetos(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos/vincular", payload, token());
  return { status };
}

export async function postCadastroOutro(
  rota: string,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(`${rota}`, payload, token());
  return { status };
}
