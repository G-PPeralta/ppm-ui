import { api, token } from "services/api";

export async function patchEditarLicaoAprendida(
  idAtividade: number,
  idLicaoAprendida: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/estatisticas/cronograma/${idAtividade}/licao-aprendida/${idLicaoAprendida}`,
    payload,
    token()
  );

  return { data, status };
}

export async function patchEditarOcorrencia(
  idAtividade: number,
  idOcorrencia: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/estatisticas/cronograma/${idAtividade}/ocorrencia/${idOcorrencia}`,
    payload,
    token()
  );

  return { data, status };
}
