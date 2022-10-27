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
  // idOcorrencia: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/ocorrencias/${idAtividade}`,
    payload,
    token()
  );

  return { data, status };
}
