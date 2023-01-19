// CRIADO EM: 04/09/2022
// AUTOR:Luiz
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à de resetar senha.

import { ResetPasswordProps, ResponseResetPassword } from "interfaces/Services";

import { api, token } from "services/api";

export async function postResetPassword(
  payload: ResetPasswordProps
): Promise<{ data: ResponseResetPassword; status: number }> {
  const { data, status } = await api.post(
    "/user/resetar-senha",
    payload,
    token()
  );

  return { data, status };
}
