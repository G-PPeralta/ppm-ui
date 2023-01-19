// CRIADO EM: 23/10/2022
// AUTOR:Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de usuários.

import { api, token } from "services/api";

export async function getUsers(): Promise<{ status: number }> {
  const { status } = await api.get("/user", token());
  return { status };
}

export async function postUsuario(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/user", payload, token());
  return { status };
}

export async function updateUser(
  payload: any,
  id: number
): Promise<{ status: number }> {
  const { status } = await api.put(`/user/${id}`, payload, token());
  return { status };
}
