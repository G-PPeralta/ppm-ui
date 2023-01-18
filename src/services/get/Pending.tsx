// CRIADO EM: 20/06/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos usuários pendentes de adição.

import { ResponseUserPending } from "interfaces/Services";

import { api, token } from "services/api";

export async function getPending(): Promise<{
  data: ResponseUserPending[];
  status: number;
}> {
  const { data, status } = await api.get("/user/pending", token());

  return { data, status };
}
