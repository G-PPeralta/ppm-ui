// CRIADO EM: 23/06/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de registro de novo usuário.

import { RegisterProps, ResponseLogin } from "interfaces/Services";

import { api, token } from "services/api";

export async function postRegister(
  payload: RegisterProps
): Promise<{ data: ResponseLogin; status: number }> {
  const { data, status } = await api.post("/user", payload, token());

  return { data, status };
}
