import { api, token } from "services/api";

export async function postOperacoesEstatisticas(
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/estatisticas/projetos/`,
    payload,
    token()
  );

  return { data, status };
}
