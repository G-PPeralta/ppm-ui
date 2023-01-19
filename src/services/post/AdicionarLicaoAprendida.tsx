// CRIADO EM: 23/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) para criação de uma nova lição aprendida.

import { LicoesAprendidasPayload } from "interfaces/Services";

import { api, token } from "services/api";

export async function postLicaoAprendida(
  payload: LicoesAprendidasPayload
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    "/projetos-atividades-licoes-aprendidas",
    payload,
    token()
  );

  return { data, status };
}
