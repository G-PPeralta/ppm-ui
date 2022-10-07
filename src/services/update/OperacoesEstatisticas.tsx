import { api, token } from "services/api";

export async function patchOperacoesEstatisticas(
  // id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/estatisticas/projetos/`,
    payload,
    token()
  );

  return { data, status };
}
