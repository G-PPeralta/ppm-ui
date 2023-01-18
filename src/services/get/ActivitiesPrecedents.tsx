// CRIADO EM: 30/09/2022
// AUTOR: Bruno
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculadas às Atividades Precedentes.

import { api, token } from "services/api";

export async function getAtividadesPrecedents(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha/precedentes`, token());

  return { data, status };
}
