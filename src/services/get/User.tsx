// CRIADO EM: 23/09/2022
// AUTOR:Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de usuários.

import { ResponsePermissions } from "interfaces/Services";

import { api, token } from "services/api";

export async function getUserPending(
  id: string
): Promise<{ data: ResponsePermissions[]; status: number }> {
  const { data, status } = await api.get(`/user/${id}`, token());

  return { data, status };
}
