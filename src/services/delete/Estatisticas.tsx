import { api, token } from "services/api";

export async function deleteOperacaoCronograma(
  id: number,
  id_usu_create?: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/estatisticas/projetos/${id}`);

  return { data, status };
}

export async function deleteLicaoAprendida(
  idAtividade: number,
  idLicaoAprendida: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/estatisticas/cronograma/${idAtividade}/licao-aprendida/${idLicaoAprendida}`,
    token()
  );

  return { data, status };
}
