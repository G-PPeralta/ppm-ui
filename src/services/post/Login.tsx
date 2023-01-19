// CRIADO EM: 23/06/2022
// AUTOR:Alexander
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) ao login.

import { LoginProps, ResponseLogin } from "interfaces/Services";

import { api, token } from "services/api";

export async function postLogin(
  payload: LoginProps
): Promise<{ data: ResponseLogin; status: number }> {
  const { data, status } = await api.post("/auth", payload, token());

  return { data, status };
}
