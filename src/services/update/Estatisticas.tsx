// CRIADO EM: 24/10/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à lição aprendida.

import { api, token } from "services/api";

export async function patchEditarLicaoAprendida(
  idAtividade: number,
  idLicaoAprendida: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `projetos-atividades-licoes-aprendidas/${idAtividade}/${idLicaoAprendida}`,
    payload,
    token()
  );

  return { data, status };
}

export async function patchEditarOcorrencia(
  idAtividade: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/ocorrencias/${idAtividade}`,
    payload,
    token()
  );

  return { data, status };
}
