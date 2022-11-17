import { api, token } from "services/api";

export async function deleteOperacaoCronograma(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/estatisticas/projetos/${id}/${user}`
  );

  return { data, status };
}

export async function deleteEstatistica(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/estatisticas/projetos/${id}/${user}`
  );

  return { data, status };
}

export async function deleteLicaoAprendida(
  idAtividade: number,
  idLicaoAprendida: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `projetos-atividades-licoes-aprendidas/${idAtividade}/${idLicaoAprendida}`,
    // `/estatisticas/cronograma/${idAtividade}/licao-aprendida/${idLicaoAprendida}`,
    token()
  );

  return { data, status };
}
