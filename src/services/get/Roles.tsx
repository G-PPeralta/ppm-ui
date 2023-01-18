// CRIADO EM: 23/06/2022
// AUTOR: Alexander
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos roles dos usuários.

import { ResponseRoles } from "interfaces/Services";

import { api, token } from "services/api";

export async function getRoles(): Promise<{
  data: ResponseRoles[];
  status: number;
}> {
  const { data, status } = await api.get(`/roles`, token());

  return { data, status };
}
